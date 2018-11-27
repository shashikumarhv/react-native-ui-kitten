import {
  DesignType,
  MappingType,
} from '../component';

/**
 * @param component: string - component name. Using displayName is recommended
 * @param design: Design - design configuration array
 *
 * @return DesignType if presents in design, undefined otherwise
 */
export function getComponentDesign(component: string, design: DesignType[]): DesignType {
  return design.find(value => value.name === component);
}

/**
 * @param component: string - component name. Using displayName is recommended
 * @param design: Design - design configuration array
 * @param variant: string - variant name. Default is 'default'
 *
 * @return MappingType if presents in design, undefined otherwise
 */
export function getComponentMapping(component: string, design: DesignType[], variant: string = 'default'): MappingType {
  const componentDesign = getComponentDesign(component, design);
  const variantConfig = componentDesign.variants.find(value => value.name === variant);
  return variantConfig.mapping;
}
