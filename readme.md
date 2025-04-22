# Appwrite setup

Install :

```powershell
docker run -it --rm `
    --volume /var/run/docker.sock:/var/run/docker.sock `
    --volume ${pwd}/appwrite:/usr/src/code/appwrite:rw `
    --entrypoint="install" `
    appwrite/appwrite:1.5.10
```

## Appwrite feedback

- Relationship are messy (can't easily query / include / exclude childs or parent)
    - Only alternative is doing the relationship yourself
- Function developpement is not documented but specific case are a pain (sending a file in binary format)
- Can't reorder the fields
- No easy way to add data to an user (no relation to Auth table)