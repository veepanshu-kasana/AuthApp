This folder contains UI components following shadcn conventions.

- Components are implemented with Tailwind utilities and `class-variance-authority` for variant support.
- Theme tokens are provided via CSS variables in `src/index.css` and mapped in `tailwind.config.cjs`.

Migration notes:
- This repo uses Tailwind v4; to run the official `shadcn` generator you may need to upgrade Tailwind or adapt the generator output.
- The `Button`, `Input`, `Card`, and `Label` components are already authored in the shadcn style and exported from `src/components/ui`.
