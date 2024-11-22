import UserList from "@/app/ui/dashboard/users-listing";

export default function UsersPage() {
  const users = [
    { id: "1", name: "John", surname: "Doe" },
    { id: "2", name: "Jane", surname: "Smith" },
    { id: "3", name: "Alice", surname: "Johnson" },
    { id: "4", name: "Bob", surname: "Brown" },
    { id: "5", name: "Emily", surname: "Davis" },
    { id: "6", name: "Chris", surname: "Wilson" },
    { id: "7", name: "Laura", surname: "Anderson" },
    // test data, we need to change this to data from API
  ];

    return (
      <div className="p-6 bg-gray-100 min-h-screen">
      <UserList users={users} />
      </div>
    );
  }
  