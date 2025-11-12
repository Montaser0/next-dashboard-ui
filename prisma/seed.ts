import { PrismaClient, Day } from '@prisma/client';
const prisma = new PrismaClient();

// 🔹 دالة اختيار عشوائي من مصفوفة
function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {


  // 🧑‍💼 إنشاء مدراء النظام
  await prisma.admin.createMany({
    data: [
      { id: 'admin-1', username: '1-مدير_النظام' },
      { id: 'admin-2', username: '2-مدير_النظام' },
    ],
  });

  // 🧾 القوائم الجاهزة
  const maleNames = ['أحمد', 'محمد', 'خالد', 'سامي', 'حسن', 'عبدالله', 'طارق'];
  const femaleNames = ['رنا', 'ليان', 'سعاد', 'منى', 'نسرين', 'هدى'];
  const surnames = ['العمر', 'الحموي', 'الديري', 'الشامي', 'البدوي', 'السيد'];
  const addresses = ['مدينة الباب', 'قباسين', 'الراعي', 'بزاعة', 'تادف'];
  const subjectsList = ['الرياضيات', 'اللغة العربية', 'العلوم', 'الاجتماعيات', 'الإنكليزية'];
  const bloodTypes = ['A+', 'O+', 'B+', 'AB+'];

  // 🧑‍🏫 إنشاء معلمين
  const teachers = [];
  for (let i = 1; i <= 5; i++) {
    const isMale = i % 2 === 0;
    const name = isMale ? randomChoice(maleNames) : randomChoice(femaleNames);
    const surname = randomChoice(surnames);

    const teacher = await prisma.teacher.create({
      data: {
        id: `t${i}`,
        username: `${name}_${surname}`,
        name,
        surname,
        email: `teacher${i}@school.com`,
        phone: `0999${100000 + i}`,
        address: randomChoice(addresses),
        bloodType: randomChoice(bloodTypes),
        sex: isMale ? 'MALE' : 'FEMALE',
        birthday: new Date(`198${i}-0${(i % 9) + 1}-10`),
      },
    });
    teachers.push(teacher);
  }

  // 👨‍👩‍👧‍👦 إنشاء أولياء الأمور
  const parents = [];
  for (let i = 1; i <= 5; i++) {
    const name = randomChoice(maleNames);
    const surname = randomChoice(surnames);
    const parent = await prisma.parent.create({
      data: {
        id: `p${i}`,
        username: `${name}_${surname}`,
        name,
        surname,
        email: `parent${i}@mail.com`,
        phone: `0988${200000 + i}`,
        address: randomChoice(addresses),
      },
    });
    parents.push(parent);
  }

  // 🎓 إنشاء المراحل الدراسية
  const grades = [];
  for (let i = 1; i <= 3; i++) {
    const grade = await prisma.grade.create({
      data: { level: i },
    });
    grades.push(grade);
  }

  // 🏫 إنشاء الصفوف
  const classes = [];
  for (let i = 1; i <= 3; i++) {
    const classData = await prisma.class.create({
      data: {
        name: `الصف ${i} أ`,
        capacity: 30,
        supervisorId: teachers[i - 1].id,
        gradeId: grades[i - 1].id,
      },
    });
    classes.push(classData);
  }

  // 📚 إنشاء المواد الدراسية
  const subjects = [];
  for (let i = 0; i < subjectsList.length; i++) {
    const subject = await prisma.subject.create({
      data: {
        name: subjectsList[i],
        teachers: { connect: [{ id: teachers[i % teachers.length].id }] },
      },
    });
    subjects.push(subject);
  }

  // 👨‍🎓 إنشاء الطلاب
  const students = [];
  for (let i = 1; i <= 10; i++) {
    const isMale = i % 2 === 0;
    const name = isMale ? randomChoice(maleNames) : randomChoice(femaleNames);
    const surname = randomChoice(surnames);
    const parent = randomChoice(parents);
    const grade = randomChoice(grades);
    const classData = randomChoice(classes);

    const student = await prisma.student.create({
      data: {
        id: `s${i}`,
        username: `${name}_${surname}`,
        name,
        surname,
        email: `student${i}@mail.com`,
        phone: `0977${300000 + i}`,
        address: randomChoice(addresses),
        bloodType: randomChoice(bloodTypes),
        sex: isMale ? 'MALE' : 'FEMALE',
        parentId: parent.id,
        classId: classData.id,
        gradeId: grade.id,
        birthday: new Date(`201${i % 5}-0${(i % 9) + 1}-15`),
      },
    });
    students.push(student);
  }

  // 🕓 إنشاء الدروس (Lessons)
  const lessons = [];
  const days: Day[] = [Day.MONDAY, Day.TUESDAY, Day.WEDNESDAY, Day.THURSDAY, Day.FRIDAY];
  for (let i = 1; i <= 5; i++) {
    const teacher = randomChoice(teachers);
    const subject = randomChoice(subjects);
    const classData = randomChoice(classes);

    const lesson = await prisma.lesson.create({
      data: {
        name: `حصة ${subject.name}`,
        day: randomChoice(days),
        startTime: new Date(`2025-11-${10 + i}T08:00:00Z`),
        endTime: new Date(`2025-11-${10 + i}T09:00:00Z`),
        subjectId: subject.id,
        classId: classData.id,
        teacherId: teacher.id,
      },
    });
    lessons.push(lesson);
  }

  // 🧪 إنشاء امتحانات وواجبات ونتائج
  for (const lesson of lessons) {
    const exam = await prisma.exam.create({
      data: {
        title: `اختبار في ${lesson.name}`,
        startTime: new Date('2025-12-01T08:00:00Z'),
        endTime: new Date('2025-12-01T09:00:00Z'),
        lessonId: lesson.id,
      },
    });

    const assignment = await prisma.assignment.create({
      data: {
        title: `واجب ${lesson.name}`,
        startDate: new Date('2025-11-15T08:00:00Z'),
        dueDate: new Date('2025-11-20T08:00:00Z'),
        lessonId: lesson.id,
      },
    });

    for (const student of students.slice(0, 3)) {
      await prisma.result.create({
        data: {
          score: Math.floor(Math.random() * 40) + 60,
          examId: exam.id,
          studentId: student.id,
        },
      });

      await prisma.result.create({
        data: {
          score: Math.floor(Math.random() * 40) + 50,
          assignmentId: assignment.id,
          studentId: student.id,
        },
      });
    }
  }

  // 📆 حضور عشوائي
  for (const lesson of lessons) {
    for (const student of students.slice(0, 4)) {
      await prisma.attendance.create({
        data: {
          date: new Date('2025-11-10T08:00:00Z'),
          present: Math.random() > 0.3,
          studentId: student.id,
          lessonId: lesson.id,
        },
      });
    }
  }

  // 🎉 الأحداث والإعلانات
  for (const classData of classes) {
    await prisma.event.create({
      data: {
        title: `نشاط صف ${classData.name}`,
        description: 'فعالية رياضية داخل المدرسة.',
        startTime: new Date('2025-11-25T08:00:00Z'),
        endTime: new Date('2025-11-25T12:00:00Z'),
        classId: classData.id,
      },
    });

    await prisma.announcement.create({
      data: {
        title: `تنويه ${classData.name}`,
        description: 'يرجى من الطلاب إحضار الكتب كاملة غداً.',
        date: new Date('2025-11-15T00:00:00Z'),
        classId: classData.id,
      },
    });
  }

  console.log('✅ تم إدخال البيانات العشوائية بنجاح');
}

main()
  .catch((e) => {
    console.error('❌ خطأ أثناء إدخال البيانات:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
