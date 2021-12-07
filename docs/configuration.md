La configuration se trouve dans le dossier `./data/config.yml` et est écrite au format [YALM][yaml].

La configuration de l'application est divisée en deux sections principales : nous avons d'une part la configuration générale du template (**layout**), et d'autre part la configuration de la page principale (**pages.home**).

## Exemple complet de configuration

```yaml
layout:
  links:
    - title:
      href:
  header:
    logo:
      src:
      alt:
  footer:
    images:
      - name: ''
        image: ''
    links:
      -
    legal:
      -

pages:
  home:
    title: GeoNature Zone Humides · Atlas
    heroText: Description
    text:
      -
    images:
      - src:
        alt:
```

[yaml]: https://fr.wikipedia.org/wiki/YAML
