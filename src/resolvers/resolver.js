const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const Employee = require('../models/Employee');
require('dotenv').config();

const resolvers = {
  Query: {
    // ✅ LOGIN USER
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('User not found');

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Incorrect password');

      return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    },

    // ✅ GET ALL EMPLOYEES
    getAllEmployees: async () => await Employee.find(),

    // ✅ SEARCH EMPLOYEE BY ID (FIXED ObjectId ISSUE)
    searchEmployeeByEid: async (_, { id }) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid Employee ID format');
      }
      return await Employee.findById(new mongoose.Types.ObjectId(id));
    },

    // ✅ SEARCH EMPLOYEE BY DESIGNATION OR DEPARTMENT
    searchEmployeeByDesignationOrDepartment: async (_, args) => {
      return await Employee.find({
        $or: [{ designation: args.designation }, { department: args.department }]
      });
    }
  },

  Mutation: {
    // ✅ USER SIGNUP (PASSWORD HASHING)
    signup: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error('Email already in use');

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      return await user.save();
    },

    // ✅ ADD NEW EMPLOYEE
    addEmployee: async (_, args) => {
      const existingEmployee = await Employee.findOne({ email: args.email });
      if (existingEmployee) throw new Error('Employee with this email already exists');

      const employee = new Employee({
        ...args,
        created_at: new Date(),
        updated_at: new Date()
      });
      return await employee.save();
    },

    // ✅ UPDATE EMPLOYEE BY ID (FIXED ObjectId ISSUE)
    updateEmployee: async (_, args) => {
      if (!mongoose.Types.ObjectId.isValid(args.id)) {
        throw new Error('Invalid Employee ID format');
      }

      const updatedEmployee = await Employee.findByIdAndUpdate(
        new mongoose.Types.ObjectId(args.id),
        { ...args, updated_at: new Date() },
        { new: true }
      );

      if (!updatedEmployee) throw new Error('Employee not found');
      return updatedEmployee;
    },

    // ✅ DELETE EMPLOYEE BY ID (FIXED ObjectId ISSUE)
    deleteEmployee: async (_, { id }) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid Employee ID format');
      }

      const deletedEmployee = await Employee.findByIdAndDelete(new mongoose.Types.ObjectId(id));
      if (!deletedEmployee) throw new Error('Employee not found');

      return 'Employee deleted successfully';
    }
  }
};

module.exports = resolvers;
