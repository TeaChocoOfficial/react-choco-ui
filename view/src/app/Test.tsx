//-Path: "react-choco-ui/view/src/app/Test.tsx"
import C, { cs, Size, useTheme } from '@teachoco-official/react-choco-ui';

export default function Test() {
    const theme = useTheme();
    const csss = cs({ px: 12 });
    // const size = new Size(12.001);
    // console.log(size.response);

    console.log(csss);
    return (
        <C.Box>
            <button className="p-2">test</button>
            <C.Button bgClr={theme.palette.main.error}>button</C.Button>
        </C.Box>
    );
}
