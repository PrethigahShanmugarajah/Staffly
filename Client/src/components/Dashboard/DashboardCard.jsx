// Client / src / components / Dashboard / DashboardCard.jsx

const DashboardCard = ({ icon: Icon, value, title }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200/70 hover:-translate-y-0.5 transition-all duration-300 p-5 sm:p-6 relative overflow-hidden group flex items-center justify-between cursor-pointer">
      <div>
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-gray-500/70 group-hover:bg-teal-500/70" />

        <p className="text-sm font-medium text-gray-700">{title}</p>

        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>

      <Icon className="size-10 p-2.5 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors duration-200" />
    </div>
  );
};

export default DashboardCard;
