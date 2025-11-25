//-Path: "react-choco-ui/lib/src/components/custom/Icon.tsx"
import { Obj } from '@teachoco-dev/cli';
import * as aiIcons from 'react-icons/ai';
import * as biIcons from 'react-icons/bi';
import * as bsIcons from 'react-icons/bs';
import * as cgIcons from 'react-icons/cg';
import * as ciIcons from 'react-icons/ci';
import * as diIcons from 'react-icons/di';
import * as faIcons from 'react-icons/fa';
import * as fa6Icons from 'react-icons/fa6';
import * as fcIcons from 'react-icons/fc';
import * as fiIcons from 'react-icons/fi';
import * as giIcons from 'react-icons/gi';
import * as goIcons from 'react-icons/go';
import * as grIcons from 'react-icons/gr';
import * as hiIcons from 'react-icons/hi';
import * as hi2Icons from 'react-icons/hi2';
import * as imIcons from 'react-icons/im';
import * as ioIcons from 'react-icons/io';
import * as io5Icons from 'react-icons/io5';
import * as liaIcons from 'react-icons/lia';
import * as libIcons from 'react-icons/lib';
import * as luIcons from 'react-icons/lu';
import * as mdIcons from 'react-icons/md';
import * as piIcons from 'react-icons/pi';
import * as riIcons from 'react-icons/ri';
import * as rxIcons from 'react-icons/rx';
import * as siIcons from 'react-icons/si';
import * as slIcons from 'react-icons/sl';
import * as tbIcons from 'react-icons/tb';
import * as tfiIcons from 'react-icons/tfi';
import * as tiIcons from 'react-icons/ti';
import * as vscIcons from 'react-icons/vsc';
import * as wiIcons from 'react-icons/wi';
import {
    FontAwesomeIcon,
    FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import * as solids from '@fortawesome/free-solid-svg-icons';
import * as brands from '@fortawesome/free-brands-svg-icons';
import * as regulars from '@fortawesome/free-regular-svg-icons';
import { IconProp as FaIconPropType } from '@fortawesome/fontawesome-svg-core';

// ==================== React Icons Types ====================
export type TypeAiIcons = keyof typeof aiIcons; // Ant Design Icons
export type TypeBiIcons = keyof typeof biIcons; // BoxIcons
export type TypeBsIcons = keyof typeof bsIcons; // Bootstrap Icons
export type TypeCgIcons = keyof typeof cgIcons; // css.gg Icons
export type TypeCiIcons = keyof typeof ciIcons; // Circum Icons
export type TypeDiIcons = keyof typeof diIcons; // Devicons
export type TypeFaIcons = keyof typeof faIcons; // Font Awesome 5
export type TypeFa6Icons = keyof typeof fa6Icons; // Font Awesome 6
export type TypeFcIcons = keyof typeof fcIcons; // Flat Color Icons
export type TypeFiIcons = keyof typeof fiIcons; // Feather Icons
export type TypeGiIcons = keyof typeof giIcons; // Game Icons
export type TypeGoIcons = keyof typeof goIcons; // Github Octicons
export type TypeGrIcons = keyof typeof grIcons; // Grommet Icons
export type TypeHiIcons = keyof typeof hiIcons; // Heroicons
export type TypeHi2Icons = keyof typeof hi2Icons; // Heroicons 2
export type TypeImIcons = keyof typeof imIcons; // IcoMoon Free
export type TypeIoIcons = keyof typeof ioIcons; // Ionicons 4
export type TypeIo5Icons = keyof typeof io5Icons; // Ionicons 5
export type TypeLiaIcons = keyof typeof liaIcons; // Line Awesome
export type TypeLibIcons = keyof typeof libIcons; // Library Icons
export type TypeLuIcons = keyof typeof luIcons; // Lucide
export type TypeMdIcons = keyof typeof mdIcons; // Material Design Icons
export type TypePiIcons = keyof typeof piIcons; // Phosphor Icons
export type TypeRiIcons = keyof typeof riIcons; // Remix Icon
export type TypeRxIcons = keyof typeof rxIcons; // Radix Icons
export type TypeSiIcons = keyof typeof siIcons; // Simple Icons
export type TypeSlIcons = keyof typeof slIcons; // Simple Line Icons
export type TypeTbIcons = keyof typeof tbIcons; // Tabler Icons
export type TypeTfiIcons = keyof typeof tfiIcons; // Themify Icons
export type TypeTiIcons = keyof typeof tiIcons; // Typicons
export type TypeVscIcons = keyof typeof vscIcons; // VS Code Icons
export type TypeWiIcons = keyof typeof wiIcons; // Weather Icons

// ==================== FontAwesome Types ====================
export type TypeSolidIcons = keyof typeof solids;
export type TypeBrandIcons = keyof typeof brands;
export type TypeRegularIcons = keyof typeof regulars;

// ==================== Icon Libraries Map ====================
const iconLibraries = {
    ai: aiIcons,
    bi: biIcons,
    bs: bsIcons,
    cg: cgIcons,
    ci: ciIcons,
    di: diIcons,
    fa: faIcons,
    fa6: fa6Icons,
    fc: fcIcons,
    fi: fiIcons,
    gi: giIcons,
    go: goIcons,
    gr: grIcons,
    hi: hiIcons,
    hi2: hi2Icons,
    im: imIcons,
    io: ioIcons,
    io5: io5Icons,
    lia: liaIcons,
    lib: libIcons,
    lu: luIcons,
    md: mdIcons,
    pi: piIcons,
    ri: riIcons,
    rx: rxIcons,
    si: siIcons,
    sl: slIcons,
    tb: tbIcons,
    tfi: tfiIcons,
    ti: tiIcons,
    vsc: vscIcons,
    wi: wiIcons,
} as const;

// ==================== Export Icon Keys ====================
export const typeAiIcons: TypeAiIcons[] = Obj.keys(aiIcons);
export const typeBiIcons: TypeBiIcons[] = Obj.keys(biIcons);
export const typeBsIcons: TypeBsIcons[] = Obj.keys(bsIcons);
export const typeCgIcons: TypeCgIcons[] = Obj.keys(cgIcons);
export const typeCiIcons: TypeCiIcons[] = Obj.keys(ciIcons);
export const typeDiIcons: TypeDiIcons[] = Obj.keys(diIcons);
export const typeFaIcons: TypeFaIcons[] = Obj.keys(faIcons);
export const typeFa6Icons: TypeFa6Icons[] = Obj.keys(fa6Icons);
export const typeFcIcons: TypeFcIcons[] = Obj.keys(fcIcons);
export const typeFiIcons: TypeFiIcons[] = Obj.keys(fiIcons);
export const typeGiIcons: TypeGiIcons[] = Obj.keys(giIcons);
export const typeGoIcons: TypeGoIcons[] = Obj.keys(goIcons);
export const typeGrIcons: TypeGrIcons[] = Obj.keys(grIcons);
export const typeHiIcons: TypeHiIcons[] = Obj.keys(hiIcons);
export const typeHi2Icons: TypeHi2Icons[] = Obj.keys(hi2Icons);
export const typeImIcons: TypeImIcons[] = Obj.keys(imIcons);
export const typeIoIcons: TypeIoIcons[] = Obj.keys(ioIcons);
export const typeIo5Icons: TypeIo5Icons[] = Obj.keys(io5Icons);
export const typeLiaIcons: TypeLiaIcons[] = Obj.keys(liaIcons);
export const typeLibIcons: TypeLibIcons[] = Obj.keys(libIcons);
export const typeLuIcons: TypeLuIcons[] = Obj.keys(luIcons);
export const typeMdIcons: TypeMdIcons[] = Obj.keys(mdIcons);
export const typePiIcons: TypePiIcons[] = Obj.keys(piIcons);
export const typeRiIcons: TypeRiIcons[] = Obj.keys(riIcons);
export const typeRxIcons: TypeRxIcons[] = Obj.keys(rxIcons);
export const typeSiIcons: TypeSiIcons[] = Obj.keys(siIcons);
export const typeSlIcons: TypeSlIcons[] = Obj.keys(slIcons);
export const typeTbIcons: TypeTbIcons[] = Obj.keys(tbIcons);
export const typeTfiIcons: TypeTfiIcons[] = Obj.keys(tfiIcons);
export const typeTiIcons: TypeTiIcons[] = Obj.keys(tiIcons);
export const typeVscIcons: TypeVscIcons[] = Obj.keys(vscIcons);
export const typeWiIcons: TypeWiIcons[] = Obj.keys(wiIcons);

export const typeIconSolids: TypeSolidIcons[] = Obj.keys(solids);
export const typeIconBrands: TypeBrandIcons[] = Obj.keys(brands);
export const typeIconRegulars: TypeRegularIcons[] = Obj.keys(regulars);

// ==================== Combined Types ====================
export type TypeIcon =
    | TypeAiIcons
    | TypeBiIcons
    | TypeBsIcons
    | TypeCgIcons
    | TypeCiIcons
    | TypeDiIcons
    | TypeFaIcons
    | TypeFa6Icons
    | TypeFcIcons
    | TypeFiIcons
    | TypeGiIcons
    | TypeGoIcons
    | TypeGrIcons
    | TypeHiIcons
    | TypeHi2Icons
    | TypeImIcons
    | TypeIoIcons
    | TypeIo5Icons
    | TypeLiaIcons
    | TypeLibIcons
    | TypeLuIcons
    | TypeMdIcons
    | TypePiIcons
    | TypeRiIcons
    | TypeRxIcons
    | TypeSiIcons
    | TypeSlIcons
    | TypeTbIcons
    | TypeTfiIcons
    | TypeTiIcons
    | TypeVscIcons
    | TypeWiIcons
    | TypeSolidIcons
    | TypeBrandIcons
    | TypeRegularIcons;

export const typeIcons: TypeIcon[] = [
    ...typeAiIcons,
    ...typeBiIcons,
    ...typeBsIcons,
    ...typeCgIcons,
    ...typeCiIcons,
    ...typeDiIcons,
    ...typeFaIcons,
    ...typeFa6Icons,
    ...typeFcIcons,
    ...typeFiIcons,
    ...typeGiIcons,
    ...typeGoIcons,
    ...typeGrIcons,
    ...typeHiIcons,
    ...typeHi2Icons,
    ...typeImIcons,
    ...typeIoIcons,
    ...typeIo5Icons,
    ...typeLiaIcons,
    ...typeLibIcons,
    ...typeLuIcons,
    ...typeMdIcons,
    ...typePiIcons,
    ...typeRiIcons,
    ...typeRxIcons,
    ...typeSiIcons,
    ...typeSlIcons,
    ...typeTbIcons,
    ...typeTfiIcons,
    ...typeTiIcons,
    ...typeVscIcons,
    ...typeWiIcons,
    ...typeIconSolids,
    ...typeIconBrands,
    ...typeIconRegulars,
];

// ==================== Component Props ====================
export type IconProps = Omit<FontAwesomeIconProps, 'icon'> & {
    className?: string;
    size?: number | string;
    color?: string;
};

export type IconProp = {
    icon?: TypeIcon;
    // React Icons
    ai?: TypeAiIcons;
    bi?: TypeBiIcons;
    bs?: TypeBsIcons;
    cg?: TypeCgIcons;
    ci?: TypeCiIcons;
    di?: TypeDiIcons;
    fa?: TypeFaIcons;
    fa6?: TypeFa6Icons;
    fc?: TypeFcIcons;
    fi?: TypeFiIcons;
    gi?: TypeGiIcons;
    go?: TypeGoIcons;
    gr?: TypeGrIcons;
    hi?: TypeHiIcons;
    hi2?: TypeHi2Icons;
    im?: TypeImIcons;
    io?: TypeIoIcons;
    io5?: TypeIo5Icons;
    lia?: TypeLiaIcons;
    lib?: TypeLibIcons;
    lu?: TypeLuIcons;
    md?: TypeMdIcons;
    pi?: TypePiIcons;
    ri?: TypeRiIcons;
    rx?: TypeRxIcons;
    si?: TypeSiIcons;
    sl?: TypeSlIcons;
    tb?: TypeTbIcons;
    tfi?: TypeTfiIcons;
    ti?: TypeTiIcons;
    vsc?: TypeVscIcons;
    wi?: TypeWiIcons;
    // FontAwesome
    solid?: TypeSolidIcons;
    brand?: TypeBrandIcons;
    regular?: TypeRegularIcons;
    props?: IconProps;
};

// ==================== Helper Functions ====================
type IconLibraryKey = keyof typeof iconLibraries;

function renderReactIcon(
    IconComponent: React.ComponentType<any>,
    props?: IconProps,
): React.ReactElement {
    return <IconComponent {...props} />;
}

function getReactIcon(
    library: IconLibraryKey,
    iconName: string,
): React.ComponentType<any> | null {
    const icons = iconLibraries[library];
    return (icons as any)[iconName] || null;
}

// Check if it's a FontAwesome icon
function isFontAwesome(iconName?: TypeIcon): boolean {
    if (!iconName) return false;
    return iconName in solids || iconName in brands || iconName in regulars;
}

// ==================== Main Component ====================
export function Icon(iconProps: IconProp): React.ReactElement | null {
    const {
        icon,
        ai,
        bi,
        bs,
        cg,
        ci,
        di,
        fa,
        fa6,
        fc,
        fi,
        gi,
        go,
        gr,
        hi,
        hi2,
        im,
        io,
        io5,
        lia,
        lib,
        lu,
        md,
        pi,
        ri,
        rx,
        si,
        sl,
        tb,
        tfi,
        ti,
        vsc,
        wi,
        solid,
        brand,
        regular,
        props,
    } = iconProps;

    // FontAwesome handling
    if (solid) {
        const faIcon = solids[solid];
        return faIcon ? (
            <FontAwesomeIcon {...props} icon={faIcon as FaIconPropType} />
        ) : null;
    }

    if (regular) {
        const faIcon = regulars[regular];
        return faIcon ? (
            <FontAwesomeIcon {...props} icon={faIcon as FaIconPropType} />
        ) : null;
    }

    if (brand) {
        const faIcon = brands[brand];
        return faIcon ? (
            <FontAwesomeIcon {...props} icon={faIcon as FaIconPropType} />
        ) : null;
    }

    if (icon && isFontAwesome(icon)) {
        const faIcon =
            solids[icon as TypeSolidIcons] ||
            regulars[icon as TypeRegularIcons] ||
            brands[icon as TypeBrandIcons];

        return faIcon ? (
            <FontAwesomeIcon {...props} icon={faIcon as FaIconPropType} />
        ) : null;
    }

    // Handle generic icon prop
    if (icon) {
        for (const libraryKey of Object.keys(
            iconLibraries,
        ) as IconLibraryKey[]) {
            const IconComponent = getReactIcon(libraryKey, icon);
            if (IconComponent) {
                return renderReactIcon(IconComponent, props);
            }
        }
    }

    // React Icons handling with improved lookup
    const reactIconsMap: Array<{
        key: IconLibraryKey;
        value: string | undefined;
    }> = [
        { key: 'ai', value: ai },
        { key: 'bi', value: bi },
        { key: 'bs', value: bs },
        { key: 'cg', value: cg },
        { key: 'ci', value: ci },
        { key: 'di', value: di },
        { key: 'fa', value: fa },
        { key: 'fa6', value: fa6 },
        { key: 'fc', value: fc },
        { key: 'fi', value: fi },
        { key: 'gi', value: gi },
        { key: 'go', value: go },
        { key: 'gr', value: gr },
        { key: 'hi', value: hi },
        { key: 'hi2', value: hi2 },
        { key: 'im', value: im },
        { key: 'io', value: io },
        { key: 'io5', value: io5 },
        { key: 'lia', value: lia },
        { key: 'lib', value: lib },
        { key: 'lu', value: lu },
        { key: 'md', value: md },
        { key: 'pi', value: pi },
        { key: 'ri', value: ri },
        { key: 'rx', value: rx },
        { key: 'si', value: si },
        { key: 'sl', value: sl },
        { key: 'tb', value: tb },
        { key: 'tfi', value: tfi },
        { key: 'ti', value: ti },
        { key: 'vsc', value: vsc },
        { key: 'wi', value: wi },
    ];

    // Handle specific library props
    for (const { key, value } of reactIconsMap) {
        if (value) {
            const IconComponent = getReactIcon(key, value);
            if (IconComponent) return renderReactIcon(IconComponent, props);
        }
    }

    return null;
}

// ==================== Dependencies ====================
// pnpm add react-icons
// pnpm add @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
// pnpm add @fortawesome/free-brands-svg-icons @fortawesome/free-regular-svg-icons
// pnpm add @fortawesome/fontawesome-svg-core
