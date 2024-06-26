// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { visit } from 'unist-util-visit';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `content/blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    excerpt: { type: 'string', required: true },
    date: { type: 'date', required: true },
    category: { type: 'string', required: true },
    coverImage: { type: 'string', required: false },
    tags: { type: 'list', of: { type: 'string' } },
    author: { type: 'string' },
    authorIcon: { type: 'string' }
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/${post._raw.flattenedPath}`
    }
  }
}));

export const Docs = defineDocumentType(() => ({
  name: 'Docs',
  filePathPattern: `content/docs/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    excerpt: { type: 'string', required: true },
    date: { type: 'date', required: true },
    subType: { type: 'string' },
    category: { type: 'string', required: true },
    tags: { type: 'string', required: true },
    author: { type: 'string' }
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/${post._raw.flattenedPath}`
    }
  }
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Docs],
  mdx: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      [rehypeKatex, { strict: 'ignore' }],
      () => (tree) => {
        visit(tree, 'element', (node) => {
          if (node.tagName === 'code' && node.data && node.data.meta) {
            node.properties.meta = node.data.meta;
          }
        });
      }
    ]
  }
});
