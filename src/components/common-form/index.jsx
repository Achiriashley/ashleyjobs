
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function CommonForm({
  action,
  buttonText,
  isBtnDisabled,
  formControls,
  btnType,
  formData,
  setFormData,
  handleFileChange,
}) {
  const renderInputByComponentType = (control) => {
    switch (control.componentType) {
      case "file":
        return (
          <div key={control.name} className="flex flex-col gap-2">
            <Label htmlFor={control.name} className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {control.label}
            </Label>
            <Input
              id={control.name}
              type="file"
              onChange={handleFileChange}
              className="cursor-pointer rounded-lg border border-gray-300 bg-white dark:bg-zinc-900 px-4 py-3 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/50"
            />
          </div>
        );

      case "input":
      default:
        return (
          <div key={control.name} className="flex flex-col gap-2">
            <Label htmlFor={control.name} className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {control.label}
            </Label>
            <Input
              type="text"
              id={control.name}
              name={control.name}
              placeholder={control.placeholder}
              disabled={control.disabled}
              value={formData[control.name]}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className="w-full rounded-lg h-11 px-4 border border-gray-300 dark:border-zinc-700 dark:bg-zinc-900 bg-white text-base outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          </div>
        );
    }
  };

  return (
    <form action={action} className="space-y-8 bg-white dark:bg-zinc-950 p-6 rounded-2xl shadow-md">
      <div className="grid gap-6">
        {formControls.map((control) => renderInputByComponentType(control))}
      </div>

      <div className="pt-4">
        <Button
          type={btnType || "submit"}
          disabled={isBtnDisabled}
          className="w-full h-11 text-base font-semibold rounded-lg transition-all duration-200"
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
}

export default CommonForm;

