import { showcaseController } from '../../../../../controllers/showcase-controller.js';

export async function PATCH(request, { params }) {
  const { name } = await params;
  return showcaseController.updateBooleanField(request, name, 'lock');
}
