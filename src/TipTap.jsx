// src/Tiptap.jsx
import {
  EditorProvider,
  FloatingMenu,
  BubbleMenu,
  EditorContent,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import { Node, mergeAttributes } from "@tiptap/core";
// define your extension array
const extensions = [StarterKit];

const content = "<p>Hello World!</p>";

console.log(" Node.create: 创建新节点", Node.create);
// console.log(" Node.extend: 拓展节点", Node.extend);
const Break = Node.create({
  name: "break",
  // priority: 1000, //没有提示
  addOptions: () => {}, //用于拓展已有插件
  addStorage() {
    // 插件内部数据
    return {
      awesomeness: 100,
    };
  },
  group: "inline", // 该节点归类为inline
  content: "inline", //只允许节点内有哪些类型节点
  addAttributes() {
    // 渲染的自定义标签默认带一个custom_color属性，默认值为pink
    return {
      color: {
        rendered: true, //是否渲染该属性，默认开启
        default: "pink",
        // 把data-color的值解析为color, 自定义的解析规则, 优先于默认的color key值
        parseHTML: (element) => element.getAttribute("data-color"),

        // 基于自定义的custom_color属性，添加一个style属性
        // renderHTML: (attributes) => {
        //   // … and return an object with HTML attributes.
        //   return {
        //     style: `color: ${attributes.color}`,
        //   };
        // },

        renderHTML({ HTMLAttributes }) {
          return [
            "break",
            mergeAttributes(HTMLAttributes, { rel: this.options.rel }),
            0,
          ];
        },
      },
    };
  },
});

const Tiptap = () => {
  const editor = useEditor({
    extensions: [...extensions, Break],
    content,
    autofocus: false,
    editable: true,
    injectCSS: false,
  });

  return (
    // <EditorProvider extensions={extensions} content={content}>
    //   <FloatingMenu>floating menu</FloatingMenu>
    //   <BubbleMenu>bubble menu</BubbleMenu>
    // </EditorProvider>
    <>
      <EditorContent editor={editor}></EditorContent>
      <div>html:{editor?.getHTML()}</div>
      <div>text:{editor?.getText()}</div>
      <div>storage:{editor?.storage}</div>
    </>
  );
};

export default Tiptap;
