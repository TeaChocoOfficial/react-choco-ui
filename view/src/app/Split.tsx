//-Path: "react-choco-ui/view/src/app/Split.tsx"
// import CDev from '$lib/react-choco-dev';
// import C from '$lib/react-choco-custom';
import C from '@teachoco-official/react-choco-custom';
import CDev, { CSplit } from '@teachoco-official/react-choco-dev';

export default function Split() {
    return (
        <C.Box>
            <CSplit screen snap>
                {/* <CDev.Split.Pane snap>
                    <C.Box>box1</C.Box>
                </CDev.Split.Pane>
                <CDev.Split.Pane snap>
                    <C.Box>box2</C.Box>
                </CDev.Split.Pane>
                <CDev.Split snap vertical>
                    <CDev.Split.Pane snap>
                        <C.Box>box3</C.Box>
                    </CDev.Split.Pane>
                    <CDev.Split.Pane snap>
                        <C.Box>box4</C.Box>
                    </CDev.Split.Pane>
                </CDev.Split> */}
                {/* <CDev.Split.Pane snap>
                    <C.Box p={5} bgClr="primary">
                        left
                    </C.Box>
                    <C.Box p={5} bgClr="secondary">
                        right
                    </C.Box>
                </CDev.Split.Pane> */}
            </CSplit>
        </C.Box>
    );
}
