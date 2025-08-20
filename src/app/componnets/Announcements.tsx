const Announcements = () => {
    return (
      <div className="bg-white p-4 rounded-md">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">الإعلانات</h1>
          <span className="text-xs text-gray-400">عرض الكل</span>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <div className="bg-skylight rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">إعلان هام: عطلة رسمية</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                2025-01-01
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              سيتم تعطيل الدوام الرسمي يوم الأحد القادم بمناسبة عيد الأضحى المبارك. نتمنى لجميع الطلاب وأولياء الأمور عيداً سعيداً.
            </p>
          </div>
          <div className="bg-purpleLight rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">فتح باب التسجيل للأنشطة الصيفية</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                2025-01-01
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              يُرجى من الراغبين في المشاركة في الأنشطة الصيفية التسجيل لدى الإدارة. الأنشطة تشمل الرياضة والفنون والعلوم.
            </p>
          </div>
          <div className="bg-yellowLight rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">تنويه بخصوص الزي المدرسي</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                2025-01-01
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              يرجى الالتزام بالزي المدرسي الرسمي خلال الدوام المدرسي. الزي المدرسي متوفر في المكتبة المدرسية.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Announcements;
  