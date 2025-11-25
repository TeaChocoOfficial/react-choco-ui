//-Path: "react-choco-ui/view/src/app/Split.tsx"
import C from '@teachoco-official/react-choco-ui';

export default function Split() {
    return (
        <C.Box>
            <C.Split screen snap >
                <C.Split.Pane snap>
                    <C.Box>box1</C.Box>
                </C.Split.Pane>
                <C.Split.Pane snap>
                    <C.Box>box2</C.Box>
                </C.Split.Pane>
                <C.Split snap vertical>
                    <C.Split.Pane snap>
                        <C.Box>box3</C.Box>
                    </C.Split.Pane>
                    <C.Split.Pane snap>
                        <C.Box>box4</C.Box>
                    </C.Split.Pane>
                </C.Split>
                {/* <C.Split.Pane snap>
                    <C.Box p={5} bgClr="primary">
                        left
                    </C.Box>
                    <C.Box p={5} bgClr="secondary">
                        right
                    </C.Box>
                </C.Split.Pane> */}
            </C.Split>
        </C.Box>
    );
}
