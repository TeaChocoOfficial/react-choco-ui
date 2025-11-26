//-Path: "lib/dev/src/components/custom/CFPSDisplay.tsx"
import { useState, useEffect, useRef } from 'react';
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';
import { CBox, CText, CButton } from '@teachoco-official/react-choco-custom';

export type FPSDisplayType = ChocoUi.Ui<
    'div',
    {
        color?: ChocoUi.Color.ColorKeys;
        graph?: boolean;
        memory?: boolean;
        visible?: boolean;
        hideBtn?: boolean;
        advanced?: boolean;
        maxHistory?: number;
        position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    }
>;

export interface FPSHistory {
    fps: number;
    timestamp: number;
}

export interface MemoryInfo {
    used: number;
    total: number;
    limit: number;
}

export const CFPSDisplay = customUi<FPSDisplayType>(
    'div',
    'CFPSDisplay',
)(
    ({
        props: {
            color = 'primary',
            graph,
            memory,
            visible,
            hideBtn,
            advanced,
            maxHistory = 60,
            position = 'top-right',
        },
        ref,
    }) => {
        const frameCount = useRef(0);
        const [fps, setFps] = useState(0);
        const animationRef = useRef<number>(0);
        const [maxFPS, setMaxFPS] = useState(60);
        const lastTime = useRef(performance.now());
        const [isVisible, setIsVisible] = useState(visible);
        const [fpsHistory, setFpsHistory] = useState<FPSHistory[]>([]);
        const [memoryInfo, setMemoryInfo] = useState<MemoryInfo | null>(null);

        // ตรวจสอบว่าเป็นโหมด minimal หรือไม่
        const isMinimalMode = !graph && !advanced && !hideBtn && !memory;

        // ฟังก์ชันแปลงหน่วยความจำ
        const formatMemory = (bytes: number) => {
            if (bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return (
                Math.round((bytes / Math.pow(k, i)) * 100) / 100 +
                ' ' +
                sizes[i]
            );
        };

        useEffect(() => {
            const calculateFPS = (timestamp: number) => {
                frameCount.current++;

                const delta = timestamp - lastTime.current;

                if (delta >= 1000) {
                    const currentFPS = Math.round(
                        (frameCount.current * 1000) / delta,
                    );
                    setFps(currentFPS);

                    // อัพเดท maxFPS
                    if (currentFPS > maxFPS) {
                        setMaxFPS(currentFPS);
                    }

                    // อัพเดทประวัติ
                    setFpsHistory((prev) => {
                        const newHistory = [
                            ...prev,
                            { fps: currentFPS, timestamp },
                        ];
                        return newHistory.slice(-maxHistory);
                    });

                    // อัพเดท Memory (ถ้าเปิดใช้งาน)
                    if (memory && 'memory' in performance) {
                        const mem = (performance as any).memory;
                        setMemoryInfo({
                            used: mem.usedJSHeapSize,
                            total: mem.totalJSHeapSize,
                            limit: mem.jsHeapSizeLimit,
                        });
                    }

                    frameCount.current = 0;
                    lastTime.current = timestamp;
                }

                animationRef.current = requestAnimationFrame(calculateFPS);
            };

            animationRef.current = requestAnimationFrame(calculateFPS);

            return () => {
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                }
            };
        }, [maxFPS, maxHistory, memory]);

        const getPositionClass = (): ChocoUi.Cs => {
            const cs = { pos: 'f' } as const;
            switch (position) {
                case 'top-left':
                    return { ...cs, t: 4, l: 4 };
                case 'top-right':
                    return { ...cs, t: 4, r: 4 };
                case 'bottom-left':
                    return { ...cs, b: 4, l: 4 };
                case 'bottom-right':
                    return { ...cs, b: 4, r: 4 };
                default:
                    return { ...cs, t: 4, r: 4 };
            }
        };

        const getFPSColor = (fpsValue: number = fps) => {
            if (isMinimalMode) {
                if (fpsValue >= 50) return '#10B981';
                if (fpsValue >= 30) return '#F59E0B';
                return '#EF4444';
            }

            const targetFPS = Math.max(60, maxFPS);
            if (fpsValue >= targetFPS * 0.9) return '#10B981';
            if (fpsValue >= targetFPS * 0.6) return '#F59E0B';
            if (fpsValue >= targetFPS * 0.3) return '#F97316';
            return '#EF4444';
        };

        const getMemoryColor = (percentage: number) => {
            if (percentage < 60) return '#10B981'; // green
            if (percentage < 80) return '#F59E0B'; // yellow
            if (percentage < 90) return '#F97316'; // orange
            return '#EF4444'; // red
        };

        const getPerformanceStatus = (fpsValue: number = fps) => {
            if (isMinimalMode) {
                if (fpsValue >= 50)
                    return { text: 'Excellent', color: 'success-5' };
                if (fpsValue >= 30) return { text: 'Good', color: 'warning-5' };
                return { text: 'Poor', color: 'error-5' };
            }

            const targetFPS = Math.max(60, maxFPS);
            if (fpsValue >= targetFPS * 0.9)
                return { text: 'Excellent', color: 'success-5' };
            if (fpsValue >= targetFPS * 0.6)
                return { text: 'Good', color: 'warning-5' };
            if (fpsValue >= targetFPS * 0.3)
                return { text: 'Fair', color: 'orange-5' };
            return { text: 'Poor', color: 'error-5' };
        };

        const toggleVisibility = () => setIsVisible(!isVisible);

        // คำนวณค่าสถิติ
        const averageFPS =
            !isMinimalMode && fpsHistory.length > 0
                ? Math.round(
                      fpsHistory.reduce((sum, data) => sum + data.fps, 0) /
                          fpsHistory.length,
                  )
                : 0;

        const minFPS =
            !isMinimalMode && fpsHistory.length > 0
                ? Math.min(...fpsHistory.map((data) => data.fps))
                : 0;

        const historicalMaxFPS =
            !isMinimalMode && fpsHistory.length > 0
                ? Math.max(...fpsHistory.map((data) => data.fps))
                : 0;

        const performanceStatus = getPerformanceStatus();

        // คำนวณ Memory percentage
        const memoryPercentage = memoryInfo
            ? Math.round((memoryInfo.used / memoryInfo.limit) * 100)
            : 0;

        // ถ้าไม่แสดงและมี hideBtn ให้แสดงปุ่ม Show
        if (!isVisible && hideBtn) {
            return (
                <CButton
                    color="info"
                    cs={getPositionClass()}
                    onClick={toggleVisibility}
                >
                    Show FPS
                </CButton>
            );
        }

        // Minimal Mode - แสดงแค่ FPS อย่างเดียว
        if (isMinimalMode) {
            return (
                <CBox
                    g={2}
                    z={50}
                    px={3}
                    py={2}
                    dFlex
                    aiCenter
                    fontS={8}
                    clr="white"
                    bgClr="#0009"
                    fontF="monospace"
                    cs={{ ...getPositionClass() }}
                >
                    <CBox dFlex aiCenter g={2}>
                        <CText tag="span">FPS:</CText>
                        <CText tag="span" fontW="bold" clr={getFPSColor()}>
                            {fps}
                        </CText>
                    </CBox>
                </CBox>
            );
        }

        // Full Mode - แสดง UI เต็มรูปแบบ
        return (
            <CBox
                ref={ref}
                cs={{
                    ...getPositionClass(),
                    p: 4,
                    z: 50,
                    borR: 2,
                    bgOp: 90,
                    minW: 220,
                    fontS: 3,
                    clr: 'white',
                    bgClr: color,
                    fontF: 'monospace',
                }}
            >
                {/* Header with Toggle */}
                {hideBtn && (
                    <CBox dFlex jcBetween aiCenter mb={3}>
                        <CText tag="span" fontW="semibold">
                            Performance Monitor
                        </CText>
                        <CButton onClick={toggleVisibility} color="info">
                            Hide
                        </CButton>
                    </CBox>
                )}

                <CBox g={3}>
                    {/* Current FPS */}
                    <CBox dFlex jcBetween aiCenter>
                        <CText tag="span">Current FPS:</CText>
                        <CText
                            tag="span"
                            fontW="bold"
                            fontS={5}
                            clr={getFPSColor()}
                        >
                            {fps}
                        </CText>
                    </CBox>

                    {/* Memory Usage - แสดงเมื่อ memory = true */}
                    {memory && memoryInfo && (
                        <CBox g={2} brT="1px solid gray-7" pt={3}>
                            <CBox dFlex jcBetween aiCenter>
                                <CText tag="span">Memory:</CText>
                                <CText
                                    tag="span"
                                    fontW="bold"
                                    clr={getMemoryColor(memoryPercentage)}
                                >
                                    {formatMemory(memoryInfo.used)}
                                </CText>
                            </CBox>

                            {/* Memory Bar */}
                            <CBox fullW bgClr="gray-8" borR="full" h={2} ofH>
                                <CBox
                                    fullH
                                    borR="full"
                                    w={`${memoryPercentage}%`}
                                    bgClr={getMemoryColor(memoryPercentage)}
                                />
                            </CBox>

                            {advanced && (
                                <>
                                    <CBox
                                        dFlex
                                        jcBetween
                                        fontS={3}
                                        clr="gray-4"
                                    >
                                        <CText tag="span">
                                            Total:{' '}
                                            {formatMemory(memoryInfo.total)}
                                        </CText>
                                        <CText tag="span">
                                            {memoryPercentage}%
                                        </CText>
                                    </CBox>
                                    <CText tag="span" fontS={3} clr="gray-4">
                                        Limit: {formatMemory(memoryInfo.limit)}
                                    </CText>
                                </>
                            )}
                        </CBox>
                    )}

                    {/* Memory Warning - ถ้าไม่รองรับ */}
                    {memory && !memoryInfo && (
                        <CText
                            tag="span"
                            fontS="xs"
                            clr="gray-4"
                            brT="1px solid gray-7"
                            pt={2}
                        >
                            Memory API not supported in this browser
                        </CText>
                    )}

                    {/* Advanced Stats */}
                    {advanced && (
                        <CBox g={2}>
                            <CBox dFlex jcBetween aiCenter>
                                <CText tag="span">Average:</CText>
                                <CText tag="span" clr={getFPSColor(averageFPS)}>
                                    {averageFPS}
                                </CText>
                            </CBox>

                            <CBox dFlex jcBetween aiCenter>
                                <CText tag="span">Min/Max:</CText>
                                <CBox dFlex g={1} fontS="xs">
                                    <CText tag="span" clr={getFPSColor(minFPS)}>
                                        {minFPS}
                                    </CText>
                                    <CText tag="span">/</CText>
                                    <CText
                                        tag="span"
                                        clr={getFPSColor(historicalMaxFPS)}
                                    >
                                        {historicalMaxFPS}
                                    </CText>
                                </CBox>
                            </CBox>

                            <CBox
                                dFlex
                                jcBetween
                                aiCenter
                                fontS="xs"
                                clr="gray-4"
                            >
                                <CText tag="span">Monitor:</CText>
                                <CText tag="span">~{maxFPS}Hz</CText>
                            </CBox>
                        </CBox>
                    )}

                    {/* Graph Section */}
                    {graph && fpsHistory.length > 0 && (
                        <CBox mt={3}>
                            <CBox
                                dFlex
                                jcBetween
                                fontS="xs"
                                clr="gray-4"
                                mb={1}
                            >
                                <CText tag="span">FPS History:</CText>
                                {advanced && (
                                    <CText tag="span">Max: {maxFPS}</CText>
                                )}
                            </CBox>
                            <CBox
                                dFlex
                                aiEnd
                                p={1}
                                h={64}
                                g="1px"
                                borR={2}
                                bgClr="gray-8"
                            >
                                {fpsHistory.slice(-30).map((data, index) => (
                                    <CBox
                                        key={index}
                                        flx={1}
                                        minH={2}
                                        borRTL={2}
                                        borRTR={2}
                                        delay={300}
                                        bgClr={getFPSColor(data.fps)}
                                        h={`${
                                            (data.fps / Math.max(maxFPS, 60)) *
                                            100
                                        }%`}
                                        cs={{ ':hover': { op: 0.8 } }}
                                        title={`FPS: ${
                                            data.fps
                                        } | Time: ${new Date(
                                            data.timestamp,
                                        ).toLocaleTimeString()}`}
                                    />
                                ))}
                            </CBox>
                        </CBox>
                    )}

                    {/* Performance Status */}
                    <CBox mt={2} fontS="xs">
                        <CText
                            tag="span"
                            bgClr={performanceStatus.color}
                            px={2}
                            py={1}
                            borR="md"
                            clr="white"
                        >
                            {performanceStatus.text}
                        </CText>
                        {advanced && (
                            <CText tag="span" ml={2} clr="gray-4">
                                (
                                {Math.round((fps / Math.max(maxFPS, 60)) * 100)}
                                % of target)
                            </CText>
                        )}
                    </CBox>
                </CBox>
            </CBox>
        );
    },
)();
