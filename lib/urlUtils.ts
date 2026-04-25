import { OdUrl } from '@/@types/common-types';
import { NavIconVariant } from '@/components/common/NavIcon';
import { alwaysString } from '@/lib/commonUtils';
import { fieldLabels } from '@/lib/fieldLabels';

export function extractUrlString(href: string | Record<any, any>): string {
  if (typeof href === 'string') {
    return href;
  }

  if (typeof href === 'object' && href !== null && 'pathname' in href) {
    const query = href.query || {};
    const keys = Object.keys(query);
    let cleanHref = alwaysString(href.pathname);
    keys.forEach((key) => {
      cleanHref = cleanHref.replace(`[${key}]`, alwaysString(query[key]));
    });
    return cleanHref;
  }

  return '';
}

type ParseOriginUrlItem = {
  children: {
    upload: UrlConfigNoIconItem & {
      children: {
        positions: UrlConfigNoIconItem;
      };
    };
  };
} & UrlConfigItem;

export type UrlConfigItem = {
  title: string;
  url: OdUrl;
  icon?: NavIconVariant;
  testId: string;
};

export type UrlConfigNoIconItem = Omit<UrlConfigItem, 'icon'>;

export type UrlConfig = {
  app: {
    title: string;
    links: {};
  };
  console: {
    title: string;
    links: {
      admin: UrlConfigItem;
    };
  };
};

const navLikTestIdPrefix = 'nav-link';

export const urlConfig: UrlConfig = {
  app: {
    title: fieldLabels.main.plural,
    links: {
      days: {
        title: fieldLabels.calendar.singular,
        url: '/days',
        icon: 'calendar',
        testId: `${navLikTestIdPrefix}-days`,
      },
      origin: {
        title: fieldLabels.origin.singular.nominative,
        url: '/origin',
        icon: 'network',
        testId: `${navLikTestIdPrefix}-origin`,
        children: {
          upload: {
            title: fieldLabels.upload.singular,
            url: '/origin/upload',
            testId: `${navLikTestIdPrefix}-origin-upload`,
            children: {
              positions: {
                title: fieldLabels.position.plural.nominative,
                url: '/origin/upload/positions',
                testId: `${navLikTestIdPrefix}-origin-upload-positions`,
              },
            },
          },
        },
      },
    },
  },
  console: {
    title: fieldLabels.settings.singular,
    links: {
      admin: {
        title: fieldLabels.console.singular,
        url: '/admin' as OdUrl,
        icon: 'settings',
        testId: `${navLikTestIdPrefix}-admin`,
      },
    },
  },
};

type DayUrlConfigItem = {
  root: UrlConfigItem;
};

export function getDayLink(id: string): DayUrlConfigItem {
  const baseUrl = `/days/${id}`;

  return {
    root: {
      title: fieldLabels.day.singular.nominative,
      url: baseUrl as OdUrl,
      testId: `${navLikTestIdPrefix}-day-item`,
    },
  };
}

// admin
interface GetAdminUrlParams {
  collection: string;
  id: string;
}

export function getAdminItemUrl({ collection, id }: GetAdminUrlParams) {
  return `/admin/collections/${collection}/${id}`;
}

export function getAdminCreateItemUrl({ collection }: Omit<GetAdminUrlParams, 'id'>) {
  return `/admin/collections/${collection}/create`;
}
