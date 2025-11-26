//-Path: "react-choco-ui/view/src/app/Test.tsx"
import { Global } from '@emotion/react';
import C, {
    Size,
    CGlobal,
    useTheme,
    ChocoStyle,
    ChocoColor,
} from '@teachoco-official/react-choco-ui';
import { ReactNode, useState } from 'react';

export default function Ui() {
    const theme = useTheme();
    const chocoColor = new ChocoColor();
    const ccolor = chocoColor.get('error');
    const [open, setOpen] = useState(false);

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
        <C.Box
            dp="f"
            ai={null}
            tag="span"
            brB={{ width: 1, color: 'secondary' }}
        >
            <C.Paper outlined>paper</C.Paper>
            <C.Split wh={500} snap>
                <C.Split.Pane snap>
                    <C.Box p={5} bgClr="primary">
                        left
                    </C.Box>
                </C.Split.Pane>
                <C.Split.Pane snap>
                    <C.Box p={5} bgClr="secondary">
                        right
                    </C.Box>
                </C.Split.Pane>
            </C.Split>
            <CollapseComponents />
            {/* <C.Button onClick={() => setOpen(true)} outline>
                open
            </C.Button>
            <C.Box p={5} bgClr={ccolor} borR={null} />
            <C.Checkbox />
            <C.Paper>
                <C.Text fontS={16}>test text</C.Text>
            </C.Paper>
            <C.List>
                <C.List.Item>1</C.List.Item>
                <C.List.Item>2</C.List.Item>
                <C.List.Item>3</C.List.Item>
            </C.List>
            <C.Dialog
                fullScrenn
                open={open}
                onClose={(event) => {
                    setOpen(false);
                    console.log(event);
                }}
            >
                <C.Button color="error" onClick={() => setOpen(false)}>
                    clone
                </C.Button>
                test
            </C.Dialog> */}

            {/* <button className="">test</button>
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
            /> */}
        </C.Box>
    );
}

function CollapseComponents() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <C.Button onClick={() => setOpen((prev) => !prev)}>open</C.Button>
            <C.Collapse open={open}>
                <p>Paragraph of text</p>
                <p>Another paragraph is also OK</p>
                <p>Images and any other content are ok too</p>
                <img src="nyancat.gif" />
            </C.Collapse>
        </>
    );
}
