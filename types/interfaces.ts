export interface DropdownComponentProps {
  data: { id: number; name: string }[];
  selectValue: number | undefined;
  setSelectValue: (value: number) => void;
}
