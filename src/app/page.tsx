import TopBar from "./ui/dashboard/top-bar";
import { homeLinks } from "./nav-links-home";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="text-center mx-auto text-gray-900">
      
      <TopBar links={homeLinks} />

      
      <header className="mb-8">
        <h1 className="mt-8 text-4xl font-bold text-blue-500">Welcome to YOUR-Fitness</h1>
        <p className="text-lg mt-2">
          You can create and manage your individual workouts!
        </p>
      </header>

      <main className="mt-4">
        <h2 className="text-2xl font-semibold mb-6">What can you do?</h2>

     
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-100 p-6 rounded-md">
          <FeatureCard
            title="Create Customized Workout Plans"
            items={[
              "As our customer, you can create workouts tailored to your needs.",
              "Log in to view all your workouts.",
            ]}
          />
          <FeatureCard
            title="Track Client Progress"
            items={[
              "As our customer, you can track your progress.",
              "As a trainer, you can monitor your client's progress.",
            ]}
          />
          <FeatureCard
            title="Organize Routines with Ease"
            items={[
              "You can organize your workout routines effortlessly.",
              "Everything you need is available on our website.",
            ]}
          />
        </div>
      </main>

      {/* Footer Image */}
      <div className="mt-8">
        <Image
          src="/images/fitness.jpg"
          alt="FITNESS"
          width={925}
          height={245}
          layout="responsive"
          objectFit="cover"
          className="w-full rounded-md"
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="bg-white p-4 shadow rounded-md transform transition-transform duration-300 hover:scale-105">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <ul className="mt-2 text-sm text-gray-600">
        {items.map((item, index) => (
          <li key={index} className="mt-2">
            - {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
