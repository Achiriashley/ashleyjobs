
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
            <Label htmlFor={control.name} className="text-sm font-medium text-foreground">
              {control.label}
            </Label>
            <Input
              id={control.name}
              type="file"
              onChange={handleFileChange}
              className="cursor-pointer rounded-lg border border-input bg-background px-4 py-3 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/50"
            />
          </div>
        );

      case "input":
      default:
        return (
          <div key={control.name} className="flex flex-col gap-2">
            <Label htmlFor={control.name} className="text-sm font-medium text-foreground">
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
              className="w-full rounded-lg h-11 px-4 border border-input bg-background text-base outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          </div>
        );
    }
  };

  return (
    <form action={action} className="space-y-8 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
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

