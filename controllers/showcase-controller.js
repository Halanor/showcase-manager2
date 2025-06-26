import { showcaseService } from '../services/showcase-service.js';

export const showcaseController = {
  async getAll(request) {
    const showcases = await showcaseService.list();
    return Response.json(showcases);
  },

  async add(request) {
    const { name } = await request.json();
    if (!name) {
      return new Response('Missing showcase name', { status: 400 });
    }

    const existing = await showcaseService.findByName({ name }); 
    if (existing) {
      return new Response(`A showcase named "${name}" already exists`, { status: 409 }); // Conflict
    }

    await showcaseService.add({ name });
    return Response.json({ message: 'Showcase added' });
  },

  async remove(request) {
    const { name } = await request.json();
    if (!name) {
      return new Response('Missing showcase name', { status: 400 });
    }
    await showcaseService.remove({ name });
    return Response.json({ message: `Showcase "${name}" removed` });
  },

  async rename(request) {
    const { oldName, newName } = await request.json();
    if (!oldName || !newName) {
      return new Response('Missing old or new name', { status: 400 });
    }

    const existing = await showcaseService.findByName({ name: newName }); 
    if (existing) {
      return new Response(`A showcase named "${newName}" already exists`, { status: 409 }); 
    }

    await showcaseService.rename({ oldName, newName });
    return Response.json({ message: `Showcase "${oldName}" renamed to "${newName}"` });
  },

  async updateBooleanField(request, name, field) {
    const { value } = await request.json();
    if (typeof value !== 'boolean') {
      return new Response(`Invalid value for ${field}`, { status: 400 });
    }
    await showcaseService.updateBooleanField({ name, field, value }); 
    return Response.json({ message: `${field} updated for ${name}` }); 
  },
};


