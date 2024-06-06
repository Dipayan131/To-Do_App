import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/api";

export const OldTask = () => {
  const { data: taskData, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks</div>;

  return (
    <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-orange-200 min-h-[80vh] md:w-[50%]">
      <h1 className="flex justify-center font-bold text-3xl mb-5">Old Tasks</h1>
      <div className='h-[1px] bg-black opacity-50 w-[90%] mx-auto my-2'></div>
      {taskData.map((task: { userId: number; id: number; title: string; completed: boolean }) => (
        <div key={task.id} className="flex justify-between items-center pl-11 my-5 pr-11 bg-white bg-opacity-90 rounded-xl font-medium h-auto">
          {task.title}
          {task.completed ? (
            <div className="flex justify-center items-center rounded-xl font-semibold bg-green-400 w-40">Completed</div>
          ) : (
            <div className="flex justify-center items-center rounded-xl font-semibold bg-red-400 w-40">Incomplete</div>
          )}
        </div>
      ))}
    </div>
  );
};
