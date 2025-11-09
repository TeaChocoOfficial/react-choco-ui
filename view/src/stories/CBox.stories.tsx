//-Path: "react-choco-ui/view/src/stories/CBox.stories.tsx"
import type { Meta, StoryObj } from '@storybook/react-vite';

import { CBox } from '../lib/index';

const meta = {
  title: 'Components/Panal/Box',
    component: CBox,
} satisfies Meta<typeof CBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <>box</>,
    },
};
