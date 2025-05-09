import { ResourceWithOptions } from 'adminjs';
import { Language, Direction } from './entities/language.entity.js';

export const LanguageResource: ResourceWithOptions = {
  resource: Language,
  options: {
    properties: {
      code: {
        isRequired: true,
        isTitle: true,
        type: 'string',
        isVisible: {
          list: true,
          edit: true,
          filter: true,
          show: true,
        },
      },
      name: {
        isRequired: true,
        isVisible: {
          list: true,
          edit: true,
          filter: true,
          show: true,
        },
      },
      native_name: {
        isVisible: {
          list: true,
          edit: true,
          filter: false,
          show: true,
        },
      },
      direction: {
        availableValues: [
          { value: Direction.LTR, label: 'Left to Right (LTR)' },
          { value: Direction.RTL, label: 'Right to Left (RTL)' },
        ],
        isRequired: true,
        isVisible: {
          list: true,
          edit: true,
          filter: true,
          show: true,
        },
      },
      is_active: {
        isVisible: {
          list: true,
          edit: true,
          filter: true,
          show: true,
        },
      },
    },
    listProperties: ['code', 'name', 'native_name', 'direction', 'is_active'],
    filterProperties: ['code', 'name', 'direction', 'is_active'],
    editProperties: ['code', 'name', 'native_name', 'direction', 'is_active'],
    showProperties: ['code', 'name', 'native_name', 'direction', 'is_active'],
    sort: {
      sortBy: 'name',
      direction: 'asc',
    },
    actions: {
      new: {
        before: async (request) => {
          // Default direction to LTR if not provided
          if (!request.payload.direction) {
            request.payload = {
              ...request.payload,
              direction: 'LTR', // Use string value instead of enum
            };
          }
          return request;
        },
      },
      edit: {
        before: async (request) => {
          return request;
        },
      },
    },
  },
};
