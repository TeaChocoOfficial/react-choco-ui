//-Path: "react-choco-ui/view/src/app/Test.tsx"
import { Global } from '@emotion/react';
import C, {
    Size,
    CGlobal,
    useTheme,
    ChocoStyle,
} from '@teachoco-official/react-choco-ui';

export default function Test() {
    const theme = useTheme();
    // const csss = new ChocoStyle({
    //     px: 12,
    //     bgClr: theme.palette.main.primary,
    //     '.ooo': {
    //         bgClr: 'red',
    //     },
    // });
    // const size = new Size(12.001);
    // console.log(size.response);
    // console.log(csss.cs);

    return (
        <C.Box dp="f" a={null}>
            <button className="">test</button>
            <C.Button color="warn">button</C.Button>
            <C.Button color="info">button</C.Button>
            <C.Button color="error">button</C.Button>
            <C.Button color="secondary">button</C.Button>
            <C.Button color="success">button</C.Button>
            <C.Button color="primary">button</C.Button>
            <C.Button text>button</C.Button>
            <C.Button outline>button</C.Button>
            <Global
                styles={{
                    body: {},
                }}
            />
            <CGlobal
                styles={{
                    body: {
                        bgClr: 'blue',
                    },
                }}
            />
        </C.Box>
    );
}
