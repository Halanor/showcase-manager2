import { showcaseController } from '../../../controllers/showcase-controller.js';

export async function GET(request) {
  return showcaseController.getAll(request);
}

export async function POST(request) {
  return showcaseController.add(request);
}

export async function DELETE(request) {
  return showcaseController.remove(request);
}

export async function PATCH(request) {
  return showcaseController.rename(request);
}

