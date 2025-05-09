import { ResourceWithOptions } from 'adminjs';
import { ChapterTranslation } from './entities/chapter-translation.entity.js';

export const ChapterTranslationResource: ResourceWithOptions = {
  resource: ChapterTranslation,
  options: {
    listProperties: [
      'title',
      'id',
      'chapter',
      'language',
      'description',
      'createdAt',
      'updatedAt',
    ],
    showProperties: [
      'id',
      'title',
      'description',
      'chapter',
      'language',
      'createdAt',
      'updatedAt',
    ],
    editProperties: ['title', 'description', 'chapter', 'language'],
    filterProperties: ['title', 'chapter', 'language'],
    properties: {
      chapter: {
        reference: 'Chapter', // ✅ pass name as string
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
      language: {
        reference: 'Language', // ✅ pass name as string
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
    },
  },
};
