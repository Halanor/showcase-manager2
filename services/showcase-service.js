import { showcaseDAO } from '../dao/showcase-dao.js';

export const showcaseService = {
  async add({ name }) {
    return showcaseDAO.add({
      name,
      temperature: 0,
      humidity: 0,
      lock: false,
      led: false,
      spot: false,
      light: false,
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

  async updateBooleanField({ name, field, value }) {
    return showcaseDAO.updateField({ name, field, value }); 
  },
};
