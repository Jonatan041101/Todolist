import AddTask from '@/components/AddTask';
import AllNotes from '@/components/AllNotes';
import Notes from '@/components/Notes';

export default function Home() {
  return (
    <main className="main">
      <AddTask />
      <Notes />
      <AllNotes />
    </main>
  );
}
