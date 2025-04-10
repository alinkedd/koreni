import { z } from 'zod';

import { nonEmptyString } from './non-empty-string';

export const indexationTableSchema = z.object({
  archiveItems: z
    .array(
      z.string().refine(
        (value) => {
          const regex =
            // eslint-disable-next-line regexp/no-obscure-range
            /^[А-ЯІа-яі]{3,}-[ДПР]?\d+[а-я]?-\d+[а-я]?-(?:\d+[а-я]?(?:Т\d+)?)?$/;
          const result = regex.test(value);
          return result;
        },
        {
          message:
            'Невалідний формат елемента archiveItems. Очікується (абревіатура архіву)-(номер фонду)-(номер опису)-(номер справи).',
        },
      ),
    )
    .optional(),
  author: z.string().optional(),
  date: z.string().transform((dateString) => new Date(dateString)),

  id: z.string().min(1),
  tableFilename: nonEmptyString,
  location: z.tuple([z.number(), z.number()]),
  size: z.number().min(1),
  sources: z.array(nonEmptyString),
  title: nonEmptyString,
  tableLocale: z.enum(['pl', 'ru', 'uk']),
  yearsRange: z
    .array(z.number().min(1500).max(new Date().getFullYear()), {
      message: `Рік повинен бути в діапазоні між 1500 і ${
        new Date().getFullYear() - 75
      }`,
    })
    .min(1)
    .max(2),
});

export type IndexationTable = z.infer<typeof indexationTableSchema>;
