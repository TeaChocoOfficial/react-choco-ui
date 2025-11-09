import { ChocoUi } from '$Type/Choco';
import { createUi } from '$/custom/test/createUi';
import { useState, useEffect, useRef } from 'react';

export type FPSDisplayType = ChocoUi.Ui<
    'div',
    {
        graph?: boolean;
        visible?: boolean;
        hideBtn?: boolean;
        advanced?: boolean;
        memory?: boolean; // เพิ่ม prop สำหรับแสดง memory
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

export const FPSDisplay = createUi<FPSDisplayType>(
    (
        {
            graph,
            memory,
            visible,
            hideBtn,
            advanced,
            maxHistory = 60,
            position = 'top-right',
        },
        ref,
    ) => {
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

        const getPositionClass = () => {
            switch (position) {
                case 'top-left':
                    return 'fixed top-4 left-4';
                case 'top-right':
                    return 'fixed top-4 right-4';
                case 'bottom-left':
                    return 'fixed bottom-4 left-4';
                case 'bottom-right':
                    return 'fixed bottom-4 right-4';
                default:
                    return 'fixed top-4 right-4';
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
                    return { text: 'Excellent', color: 'bg-green-600' };
                if (fpsValue >= 30)
                    return { text: 'Good', color: 'bg-yellow-600' };
                return { text: 'Poor', color: 'bg-red-600' };
            }

            const targetFPS = Math.max(60, maxFPS);
            if (fpsValue >= targetFPS * 0.9)
                return { text: 'Excellent', color: 'bg-green-600' };
            if (fpsValue >= targetFPS * 0.6)
                return { text: 'Good', color: 'bg-yellow-600' };
            if (fpsValue >= targetFPS * 0.3)
                return { text: 'Fair', color: 'bg-orange-600' };
            return { text: 'Poor', color: 'bg-red-600' };
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
                <button
                    onClick={toggleVisibility}
                    className={`${getPositionClass()} bg-gray-800 text-white px-3 py-2 rounded-lg text-sm z-50 hover:bg-gray-700 transition-colors`}
                >
                    Show FPS
                </button>
            );
        }

        // Minimal Mode - แสดงแค่ FPS อย่างเดียว
        if (isMinimalMode) {
            return (
                <div
                    className={`${getPositionClass()} bg-black bg-opacity-80 text-white px-3 py-2 rounded-lg font-mono text-sm z-50`}
                >
                    <div className="flex items-center gap-2">
                        <span>FPS:</span>
                        <span
                            className="font-bold"
                            style={{ color: getFPSColor() }}
                        >
                            {fps}
                        </span>
                    </div>
                </div>
            );
        }

        // Full Mode - แสดง UI เต็มรูปแบบ
        return (
            <div
                ref={ref}
                className={`${getPositionClass()} bg-gray-900 bg-opacity-90 text-white p-4 rounded-lg font-mono text-sm z-50 min-w-[220px]`}
            >
                {/* Header with Toggle */}
                {hideBtn && (
                    <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold">
                            Performance Monitor
                        </span>
                        <button
                            onClick={toggleVisibility}
                            className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition-colors"
                        >
                            Hide
                        </button>
                    </div>
                )}

                <div className="space-y-3">
                    {/* Current FPS */}
                    <div className="flex justify-between items-center">
                        <span>Current FPS:</span>
                        <span
                            className="font-bold text-lg"
                            style={{ color: getFPSColor() }}
                        >
                            {fps}
                        </span>
                    </div>

                    {/* Memory Usage - แสดงเมื่อ memory = true */}
                    {memory && memoryInfo && (
                        <div className="space-y-2 border-t border-gray-700 pt-3">
                            <div className="flex justify-between items-center">
                                <span>Memory:</span>
                                <span
                                    className="font-bold"
                                    style={{
                                        color: getMemoryColor(memoryPercentage),
                                    }}
                                >
                                    {formatMemory(memoryInfo.used)}
                                </span>
                            </div>

                            {/* Memory Bar */}
                            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                                <div
                                    className="h-full transition-all duration-300 rounded-full"
                                    style={{
                                        width: `${memoryPercentage}%`,
                                        backgroundColor:
                                            getMemoryColor(memoryPercentage),
                                    }}
                                />
                            </div>

                            {advanced && (
                                <>
                                    <div className="flex justify-between text-xs text-gray-400">
                                        <span>
                                            Total:{' '}
                                            {formatMemory(memoryInfo.total)}
                                        </span>
                                        <span>{memoryPercentage}%</span>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        Limit: {formatMemory(memoryInfo.limit)}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* Memory Warning - ถ้าไม่รองรับ */}
                    {memory && !memoryInfo && (
                        <div className="text-xs text-gray-400 border-t border-gray-700 pt-2">
                            Memory API not supported in this browser
                        </div>
                    )}

                    {/* Advanced Stats */}
                    {advanced && (
                        <>
                            <div className="flex justify-between items-center">
                                <span>Average:</span>
                                <span
                                    style={{ color: getFPSColor(averageFPS) }}
                                >
                                    {averageFPS}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span>Min/Max:</span>
                                <span className="text-xs">
                                    <span
                                        style={{ color: getFPSColor(minFPS) }}
                                    >
                                        {minFPS}
                                    </span>
                                    {' / '}
                                    <span
                                        style={{
                                            color: getFPSColor(
                                                historicalMaxFPS,
                                            ),
                                        }}
                                    >
                                        {historicalMaxFPS}
                                    </span>
                                </span>
                            </div>

                            <div className="flex justify-between items-center text-xs text-gray-400">
                                <span>Monitor:</span>
                                <span>~{maxFPS}Hz</span>
                            </div>
                        </>
                    )}

                    {/* Graph Section */}
                    {graph && fpsHistory.length > 0 && (
                        <div className="mt-3">
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>FPS History:</span>
                                {advanced && <span>Max: {maxFPS}</span>}
                            </div>
                            <div className="flex items-end h-12 gap-px bg-gray-800 rounded p-1">
                                {fpsHistory.slice(-30).map((data, index) => (
                                    <div
                                        key={index}
                                        className="flex-1 rounded-t transition-all duration-300 hover:opacity-80"
                                        style={{
                                            height: `${
                                                (data.fps /
                                                    Math.max(maxFPS, 60)) *
                                                100
                                            }%`,
                                            backgroundColor: getFPSColor(
                                                data.fps,
                                            ),
                                            minHeight: '2px',
                                        }}
                                        title={`FPS: ${
                                            data.fps
                                        } | Time: ${new Date(
                                            data.timestamp,
                                        ).toLocaleTimeString()}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Performance Status */}
                    <div className="mt-2 text-xs">
                        <div
                            className={`inline-block px-2 py-1 rounded ${performanceStatus.color}`}
                        >
                            {performanceStatus.text}
                        </div>
                        {advanced && (
                            <span className="ml-2 text-gray-400">
                                (
                                {Math.round((fps / Math.max(maxFPS, 60)) * 100)}
                                % of target)
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );
    },
    'FPSDisplay',
);
