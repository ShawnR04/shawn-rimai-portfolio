import ActivityCalendar from 'react-activity-calendar';

const customTheme = {
  dark: [
    '#1e232a', // level 0 (empty: dark charcoal with border)
    '#005c6e', // level 1
    '#0098a6', // level 2
    '#00e5ff', // level 3 (vibrant cyan)
    '#e0ffff', // level 4 (highest: near-white highlight)
  ],
};

export default function CommitMap({ data }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-[#0d1117]/80 p-6 backdrop-blur-md">
      <ActivityCalendar
        data={data}
        theme={customTheme}
        colorScheme="dark"
        blockSize={12}
        blockRadius={3}
        blockMargin={3}
        fontSize={12}
      />
    </div>
  );
}