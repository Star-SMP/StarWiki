import { defineConfig } from 'vitepress'
import imageFigures from 'markdown-it-image-figures'
import MarkdownItToken from 'markdown-it/lib/token';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  cleanUrls: true,
  lastUpdated: true,
  title: "StarWiki",
  description: "Вики сервера Star SMP",
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  markdown: { // WARNING: ChatGPT
    config: md => {
        // Используем плагин imageFigures для поддержки figcaption
        md.use(imageFigures, { figcaption: true });

        // Проксируем стандартное поведение рендеринга
        const proxy = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options);

        // Рендереры для figcaption и small
        const defaultFigCaptionOpenRenderer = md.renderer.rules.figcaption_open || proxy;
        const defaultSmallOpenRenderer = md.renderer.rules.small_open || proxy;

        // Переопределяем рендерер для открытия figcaption с инлайн-стилем для центровки
        md.renderer.rules.figcaption_open = function(tokens, idx, options, env, self) {
            // Добавляем инлайн-стиль к самому токену figcaption
            tokens[idx].attrSet('style', 'text-align:center; margin-top:8px; color:#919191;');

            // Рендерим стандартный контент figcaption + small
            const small = new MarkdownItToken("small_open", "small", 1);
            small.attrs = [['style', 'opacity:0.8;']];
            return `${defaultFigCaptionOpenRenderer(tokens, idx, options, env, self)}${defaultSmallOpenRenderer([small], 0, options, env, self)}`;
        };

        // Переопределяем рендерер для закрытия figcaption
        const defaultFigCaptionCloseRenderer = md.renderer.rules.figcaption_close || proxy;
        const defaultSmallCloseRenderer = md.renderer.rules.small_close || proxy;

        md.renderer.rules.figcaption_close = function(tokens, idx, options, env, self) {
            const small = new MarkdownItToken("small_close", "small", -1);
            return `${defaultSmallCloseRenderer([small], 0, options, env, self)}${defaultFigCaptionCloseRenderer(tokens, idx, options, env, self)}`;
        };
    }
},
  themeConfig: {
    logo: '/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Главная', link: '/' },
      { text: 'Информация', link: 'info/start' },
      { text: 'Магазин', link: 'https://shop.starsmp.fun/'},
      { text: 'Карта', link: 'https://map.starsmp.fun/'}
    ],

    sidebar: [
      {
        text: '🌟 Информация',
        items: [
          { text: 'Как начать играть?', link: 'info/start'},
          { text: 'Правила сервера', link: 'info/rules',
            collapsed: true,
            items: [
              { text: 'Запрещённые модификации', link: 'info/rules-cheats' },
              { text: 'Виды наказаний', link: 'info/rules-warns'}
            ]
          },
          { text: 'StarPlus', link: 'info/starplus'},
          { text: 'Скины', link: 'info/skin' },
          {
            text: '⚙ Дополнительные моды',
            collapsed: true,
            items: [
              { text: 'Модпак', link: 'mods/modpack'},
              { text: 'Голосовой чат', link: 'mods/voicechat',
                collapsed: true,
                items: [
                  { text: 'Группы', link: 'mods/voice-groups'},
                  { text: 'Пользовательские треки', link: 'mods/voice-discs'}
                ]
              },
              { text: 'Эмоции и танцы', link: 'mods/emotecraft'},
              { text: 'Ресурспак', link: 'mods/resourcepack.md'}
            ]
          }
        ]
      },
      {
        text: '🔮 Механики и команды',
        items: [
          { text: 'StarPass', link: 'features/starpass'},
          { text: 'Правительство', link: 'features/government'},
          { text: 'Расширение барьера', link: 'features/border'},
          { text: 'Ограничения элитров', link: 'features/elytra'},
          { text: 'Чат', link: 'features/chat'},
          { text: 'Онлайн-карта', link: 'features/map'},
          { text: 'Достижения', link: 'features/advancements'},
          { text: 'Улучшенная рыбалка', link: 'features/fishing'},
          { text: 'Новая генерация', link: 'features/newgen'},
          { text: 'Кузнечные шаблоны', link: 'features/trims'},
          { text: 'Взаимодействия с рамкой', link: 'features/frames'},
          { text: 'Позы', link: 'features/poses'},
          { text: 'Теги', link: 'features/tags'},
          { text: 'Тотемы бессмертия', link: 'features/totems'},
          { text: 'Подпись предмета', link: 'features/signitem'},
          { text: 'Невидимый свет', link: 'features/light' },
          { text: 'Волейбол', link: 'features/volleyball'},
          { text: 'Улучшенный камнерез', link: 'features/cutter'},
          { text: 'Взрыв криперов', link: 'features/creeper'},
          { text: 'Сон', link: 'features/phantom'},
          {
            text: '1️⃣ Архив: первый сезон',
            collapsed: true,
            items: [
              { text: 'Больше еды', link: 'firstseason/features/features-morefood'},
              { text: 'Творческий стол', link: 'firstseason/features/painting-table'},
              { text: 'Верхний мир', link: 'firstseason/features/features-overworld'},
              { text: 'Нижний мир', link: 'firstseason/features/features-nether'},
              { text: 'Мелкие изменения',
                items: [
                    { text: 'Способы получения "Проворства"', link: 'firstseason/features/features-mini-swsneak'}
                ]
              }
            ]
          },
          {
            text: '2️⃣ Архив: второй сезон',
            collapsed: true,
            items: [
              { text: 'Больше кастомизации брони', link: 'secondseason/features/moretrims'},
              { text: 'Пустыни и мессы', link: 'secondseason/features/sands'},
              { text: 'Дополнения к скалку', link: 'secondseason/features/sculk'},
              { text: 'Ребаланс торговли', link: 'secondseason/features/traderebalance'},
              { text: 'Названия шалкеров', link: 'secondseason/features/shulkers'}
            ]
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/starsmp' }
    ]
  }
})
