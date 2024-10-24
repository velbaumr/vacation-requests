import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  calculateRequestedDays,
  calculateStartDate,
  calculateEndDate,
} from "../functions/FormCalculations";
import vacationRequest from "../types/VacationRequest";
import apiClient from "../services/ApiCilent";
import { useForm } from "react-hook-form";

interface FormData {
  startDate: string;
  requestedDays: number;
  endDate: string;
  comment?: string;
}

const RequestForm = () => {
  const navigate = useNavigate();

  const post = async (payload: vacationRequest) => {
    const apiResult = await apiClient.post<vacationRequest>(
      "vacation_requests",
      payload
    );
    apiResult.code === 201 ? navigate("/") : console.error(apiResult.error);
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    reValidateMode: "onSubmit",
    defaultValues: {
      startDate: "",
      requestedDays: 0,
      endDate: "",
      comment: "",
    },
  });

  const startDateValue = watch("startDate");
  const requestedDaysValue = watch("requestedDays");
  const endDateValue = watch("endDate");

  const onSubmit = (data: FormData) => {
    const result: vacationRequest = {
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      requestedDays: data.requestedDays,
      comment: data.comment || "",
    };

    post(result);
  };

  const stringToDate = (dateString?: string): Date | undefined =>
    dateString ? new Date(dateString) : undefined;

  const dateToString = (date: Date): string => date.toISOString().split("T")[0];

  const onStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDateValue = e.target.value;
    setValue("startDate", newStartDateValue);

    if (endDateValue && newStartDateValue) {
      const days = calculateRequestedDays(
        stringToDate(newStartDateValue),
        stringToDate(endDateValue)
      );
      setValue("requestedDays", days);
    }
    if (requestedDaysValue && newStartDateValue) {
      setValue(
        "endDate",
        dateToString(
          calculateEndDate(new Date(newStartDateValue), requestedDaysValue)
        )
      );
    }
  };

  const onRequestedDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRequestedDaysValue = Number(e.target.value);
    setValue("requestedDays", newRequestedDaysValue);

    if (startDateValue) {
      setValue(
        "endDate",
        dateToString(
          calculateEndDate(new Date(startDateValue), newRequestedDaysValue)
        )
      );
    }
    if (endDateValue && !startDateValue) {
      setValue(
        "startDate",
        dateToString(
          calculateStartDate(new Date(endDateValue), newRequestedDaysValue)
        )
      );
    }
  };

  const onEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDateValue = e.target.value;
    setValue("endDate", newEndDateValue);

    if (startDateValue && newEndDateValue) {
      const days = calculateRequestedDays(
        stringToDate(startDateValue),
        stringToDate(newEndDateValue)
      );
      setValue("requestedDays", days);
    }
    if (requestedDaysValue && !startDateValue && newEndDateValue) {
      setValue(
        "startDate",
        dateToString(
          calculateStartDate(new Date(newEndDateValue), requestedDaysValue)
        )
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="col-md-4  offset-md-4">
      <Form.Group className="mb-3">
        <Form.Label htmlFor="startDate">Start Date</Form.Label>
        <Form.Control
          type="date"
          id="startDate"
          {...register("startDate", { required: "Start date is required" })}
          isInvalid={!!errors.startDate}
          value={startDateValue || ""}
          onChange={onStartDateChange}
        />
        {errors.startDate && (
          <Form.Control.Feedback type="invalid">
            {errors.startDate.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="requestedDays">
          Number of Requested Vacation Days
        </Form.Label>
        <Form.Control
          type="number"
          id="requestedDays"
          isInvalid={!!errors.requestedDays}
          value={requestedDaysValue}
          {...register("requestedDays", {
            required: "Requested days is required",
            min: { value: 1, message: "Requested days must be greater than 0" },
          })}
          onChange={onRequestedDaysChange}
        />
        {errors.requestedDays && (
          <Form.Control.Feedback type="invalid">
            {errors.requestedDays.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="endDate">End Date</Form.Label>
        <Form.Control
          type="date"
          id="endDate"
          {...register("endDate", {
            required: "End date is required",
            validate: (value) =>
              new Date(value) >= new Date(startDateValue) ||
              "End date must be the same or after the start date",
          })}
          value={endDateValue || ""}
          isInvalid={!!errors.endDate}
          onChange={onEndDateChange}
        />
        {errors.endDate && (
          <Form.Control.Feedback type="invalid">
            {errors.endDate.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="comment">Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          id="comment"
          {...register("comment")}
        />
      </Form.Group>
      <Button
        type="submit"
        variant="primary"
        className="button-primary  mt-2 ms-2"
      >
        Add Request
      </Button>
      <Button
        onClick={() => navigate("/")}
        variant="secondary"
        className="button-primary  mt-2 ms-2"
      >
        Cancel
      </Button>
    </form>
  );
};

export default RequestForm;
