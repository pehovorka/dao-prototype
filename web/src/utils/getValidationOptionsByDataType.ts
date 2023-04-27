import type { RegisterOptions } from "react-hook-form";

export type SolidityDataType =
  | "address"
  | "uint8"
  | "uint256"
  | "bytes"
  | "bytes32"
  | "address[]"
  | "uint8[]"
  | "uint256[]"
  | "bytes[]"
  | "bytes32[]";

export const getValidationOptionsByDataType = (
  dataType: SolidityDataType
): RegisterOptions => {
  switch (dataType) {
    case "address":
      return { required: true, pattern: /^0x[a-fA-F0-9]{40}$/g };
    case "uint8":
      return { required: true, pattern: /^[0-9]{1,3}$/g, min: 0, max: 255 };
    case "uint256":
      return { required: true, pattern: /^[0-9]{1,78}$/g, min: 0 };
    case "bytes":
      return { required: true, pattern: /^0x[a-fA-F0-9]{1,64}$/g };
    case "bytes32":
      return { required: true, pattern: /^0x[a-fA-F0-9]{64}$/g };
    case "address[]":
      return {
        required: true,
        pattern: /^(\s*0x[a-fA-F0-9]{40}\s*(,\s*0x[a-fA-F0-9]{40}\s*)*)?$/g,
      };
    case "uint8[]":
      return {
        required: true,
        pattern: /^(\s*[0-9]{1,3}\s*(,\s*[0-9]{1,3}\s*)*)?$/g,
      };
    case "uint256[]":
      return {
        required: true,
        pattern: /^(\s*\d{1,77}\s*(,\s*\d{1,77}\s*)*)?$/g,
      };
    case "bytes[]":
      return {
        required: true,
        pattern: /^((0x[a-fA-F0-9]{1,64})*\s*(,\s*(0x[a-fA-F0-9]{1,64})*)*)?$/g,
      };
    case "bytes32[]":
      return {
        required: true,
        pattern: /^((0x[a-fA-F0-9]{64})*\s*(,\s*(0x[a-fA-F0-9]{64})*)*)?$/g,
      };
    default:
      return { required: true };
  }
};
