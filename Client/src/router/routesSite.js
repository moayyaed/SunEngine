import Categories1 from 'categories/Categories1.vue';
import Categories2 from 'categories/Categories2.vue';
import Material from 'material/Material.vue';
import Thread from 'forum/Thread.vue';
import NewTopics from 'forum/NewTopics.vue';
import ArticlesList from 'articles/ArticlesList.vue';
import TestExt from 'pages/TestExt.vue';
import ForumNavPanel from 'forum/ForumNavPanel';
import Blog from 'blog/Blog';
import Index from 'pages/Index.vue';

const routes = [
  {
    name: "Home",
    path: '/',
    component: Index
  },
  {
    path: '/TestExt'.toLowerCase(),
    component: TestExt,
  },
  {
    path: '/forum',
    components: {
      default: NewTopics,
      navigation: ForumNavPanel
    },
    props: {
      default: {categoryName: "forum"},
      navigation: {categories: Categories1, categoryName: "forum"}
    },
  },
  {
    path: '/forum/:categoryName',
    components: {
      default: Thread,
      navigation: ForumNavPanel
    },
    props: {
      default: true,
      navigation: {categories: Categories1, categoryName: "forum"}
    }
  },
  {
    path: '/forum/:categoryName/:id',
    components: {
      default: Material,
      navigation: ForumNavPanel
    },
    props: {
      default: (route) => {
        return {categoryName: route.params.categoryName, id: +route.params.id}
      },
      navigation: {categories: Categories1, categoryName: "Forum"}
    }
  },
  {
    path: '/forum2l',
    components: {
      default: NewTopics,
      navigation: ForumNavPanel
    },
    props: {
      default: {categoryName: "forum2L"},
      navigation: {categories: Categories2, categoryName: "forum2l"}
    },
  },
  {
    path: '/forum2l/:categoryName',
    components: {
      default: Thread,
      navigation: ForumNavPanel
    },
    props: {
      default: true,
      navigation: {categories: Categories2, categoryName: "forum2l"}
    }
  },
  {
    path: '/forum2l/:categoryName/:id',
    components: {
      default: Material,
      navigation: ForumNavPanel
    },
    props: {
      default: (route) => {
        return {categoryName: route.params.categoryName, id: +route.params.id}
      },
      navigation: {categories: Categories2, categoryName: "forum2l"}
    }
  },
  {
    path: '/articles',
    components: {
      default: ArticlesList,
      navigation: null
    },
    props: {
      default: {
        categoryName: "articles"
      }
    }
  },
  {
    path: '/articles/:id',
    components: {
      default: Material,
      navigation: null
    },
    props: {
      default: (route) => {
        return {
          categoryName: "articles",
          id: +route.params.id
        }
      }
    }
  },
  {
    path: '/blog',
    components: {
      default: Blog,
      navigation: null
    },
    props: {
      default: {
        categoryName: "blog"
      }
    }
  },
  {
    path: '/blog/:id',
    components: {
      default: Material,
      navigation: null
    },
    props: {
      default: (route) => {
        return {categoryName: "blog", id: +route.params.id}
      }
    }
  }
]


export default routes;
