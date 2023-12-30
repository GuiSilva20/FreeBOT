
const mapAbbreviationToAttribute = (abbreviation, category) => {
    const mappings = {
        ESP: {
            vont: 'vontade',
            conj: 'conjuracao',
            intim: 'intimidade',
            pres: 'presenca',
        },
        SAB: {
            perc: 'percepcao',
            sobr: 'sobrevivencia',
            loc: 'localizacao',
            crim: 'crime',
        },
        INT: {
            intu: 'intuicao',
            diplom: 'diplomacia',
            atual: 'atualidades',
        },
        AGI: {
            atl: 'atletismo',
            acro: 'acrobacia',
            furt: 'furtividade',
            refl: 'reflexos',
            per: 'pericia',
        },
        FOR: {
            vig: 'vigor',
            brut: 'brutalidade',
            fort: 'fortitude',
        },
    };

    return mappings[category] ? `${category}.${mappings[category][abbreviation]}` : abbreviation;
};


module.exports = mapAbbreviationToAttribute;
