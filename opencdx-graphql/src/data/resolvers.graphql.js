import { Manufacturers, Devices, Patients, Audit } from "../db/dbConnector.js";

/**
 * GraphQL Resolvers
 **/

export const resolvers = {
  Query: {
    getManufacturers: async (root) => {
      try {
        const manufacturers = await Manufacturers.find();
        return manufacturers;
      } catch (err) {
        reject(err)
      }
    },
    findAManufacturer: async (root, { id }) => {
      try {
        const manufacturer = await Manufacturers.findOne({ _id: id });
        return manufacturer;
      } catch (err) {
        reject(err)
      }
    },
    getDevices: async (root) => {
      try {
        const devices = await Devices.find();
        return devices;
      } catch (err) {
        reject(err)
      }
    },
    findADevice: async (root, { id }) => {
      try {
        const device = await Devices.findOne({ _id: id });
        return device;
      } catch (err) {
        reject(err)
      }
    },
    getPatients: async (root) => {
      try {
        const patients = await Patients.find();
        return patients;
      } catch (err) {
        reject(err)
      }
    },
    findAPatient: async (root, { id }) => {
      try {
        const patient = await Patients.findOne({ _id: id });
        return patient;
      } catch (err) {
        reject(err)
      }
    },
    getAudit: async (root) => {
      try {
        const audit = await Audit.find();
        return audit;
      } catch (err) {
        reject(err)
      }
    },
  },
};