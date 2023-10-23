import { UserType } from "@/app/store/slices/usersSlice";
import { Avatar, Button, Card } from "flowbite-react";

export default function UserCard({
  user,
  index,
  onToggleEmail,
}: {
  index: number;
  user: UserType;
  onToggleEmail: (idx: number) => void;
}) {
  const handleToggleEmail = () => {
    onToggleEmail(index);
  };

  return (
    <Card key={"users" + user.id} className="m-3 md:">
      <div key={user.id} className="flex flex-col items-center pb-10">
        <Avatar img={user.avatar} size="xl" />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {user.first_name}, {user.last_name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user.show_email
            ? user.email
            : user.email.replace(
                /^(.)(.*)(.@.*)$/,
                (_, a, b, c) => a + b.replace(/./g, "*") + c
              )}
        </span>
        <Button className="mt-2" onClick={handleToggleEmail}>
          {user.show_email === true ? "Hide" : "Show"} Email
        </Button>
      </div>
    </Card>
  );
}
