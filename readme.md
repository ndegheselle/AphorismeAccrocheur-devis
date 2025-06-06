Web application for managing client invoices and estimates. It allows the creation of invoices with items, taxes, client information and supports PDF export. Developed with SvelteKit 5 and Appwrite, and deployed with Vercel. The objective was to create a modern application while simplifying the development process as much as possible.

![](preview.gif?raw=true)

# Tech stack

- [SvelteKit](https://svelte.dev/) : UI framework
- [DaisyUI](https://daisyui.com/) : css styles based on [tailwindcss](https://tailwindcss.com/)
- [Fontawesome](https://fontawesome.com/) : icons
- [Appwrite](https://appwrite.io/) : backend severless

# Feedback

## Appwrite

- Relationship are messy (can't easily query / include / exclude childs or parent)
    - Only alternative is doing the relationship yourself
    - Can't do queries like all user where there is no posts or similar (all users with more than 10 likes on the posts)
- Function developpement is documented but specific case are a pain (sending a file in binary format)
    - Local setup is somewhat hard in order to avoid having to deploy for every test
- Can't reorder the fields
- No easy way to add data to an user (no relation to Auth table, need to create your own table with function to ensure that it's sync on user registration)

## SvelteKit 5

- Not fan of having both the old and new syntax
- Clearly not mean for simple SPA
- Class are not reactive then used in a state, you need to declare the properties of the class as states