import { showcaseDAO } from '../dao/showcase-dao.js';

export const showcaseService = {
  async add({ name }) {
    return showcaseDAO.add({
      name,
      lights: ['spots', 'LED Strip'], 
      temps: [], 
      humidity: [], 
      createdAt: new Date(),
    });
  },

  async remove({ name }) {
    return showcaseDAO.remove(name);
  },

  async rename({ oldName, newName }) {
    return showcaseDAO.rename(oldName, newName);
  },

  async list() {
    return showcaseDAO.list();
  },
};
