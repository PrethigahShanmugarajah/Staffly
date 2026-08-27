// Client / src / components / PageHeader.jsx

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-medium text-gray-900 tracking-tight">
        {title}
      </h1>

      <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
    </div>
  );
};

export default PageHeader;
