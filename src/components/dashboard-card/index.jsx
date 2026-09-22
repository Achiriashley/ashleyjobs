import Link from "next/link";

function DashboardCard({ title, description, href, cta }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
      </div>
      <Link
        href={href}
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-center hover:bg-blue-700 transition"
      >
        {cta}
      </Link>
    </div>
  );
}

export default DashboardCard;
