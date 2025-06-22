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
    await showcaseService.rename({ oldName, newName });
    return Response.json({ message: `Showcase "${oldName}" renamed to "${newName}"` });
  },
};

