//-Path: "react-choco-ui-test/src/stories/CBox.stories.tsx"
import type { Meta, StoryObj } from '@storybook/react-vite';

import { CBox } from '../index';

const meta = {
  title: "Components/Box",
  component: CBox,
} satisfies Meta<typeof CBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};