const Student = require('../models/Student');

exports.createStudent = async (req, res) => {
  const { name, rollNumber, email, course, phone, address } = req.body;

  if (!name || !rollNumber || !email || !course || !phone || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existingStudent = await Student.findOne({ $or: [{ email }, { rollNumber }] });
  if (existingStudent) {
    return res.status(409).json({ message: 'Student with this email or roll number already exists' });
  }

  const student = await Student.create({ name, rollNumber, email, course, phone, address });
  res.status(201).json(student);
};

exports.getStudents = async (req, res) => {
  const { search, course, sortBy, order = 'desc', page = 1, limit = 10 } = req.query;
  const filters = {};

  if (search) {
    filters.$or = [
      { name: new RegExp(search, 'i') },
      { rollNumber: new RegExp(search, 'i') },
      { email: new RegExp(search, 'i') },
      { course: new RegExp(search, 'i') },
    ];
  }

  if (course) {
    filters.course = course;
  }

  const sortOptions = {};
  if (sortBy) {
    sortOptions[sortBy] = order === 'asc' ? 1 : -1;
  } else {
    sortOptions.createdAt = -1;
  }

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Student.countDocuments(filters);
  const students = await Student.find(filters)
    .sort(sortOptions)
    .skip(skip)
    .limit(Number(limit));

  res.json({ total, page: Number(page), limit: Number(limit), students });
};

exports.getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  res.json(student);
};

exports.updateStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  const { name, rollNumber, email, course, phone, address } = req.body;
  student.name = name || student.name;
  student.rollNumber = rollNumber || student.rollNumber;
  student.email = email || student.email;
  student.course = course || student.course;
  student.phone = phone || student.phone;
  student.address = address || student.address;

  await student.save();
  res.json(student);
};

exports.deleteStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  await Student.deleteOne({ _id: req.params.id });
  res.json({ message: 'Student deleted successfully' });
};
