import { StyleSheet } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { Controller, UseFormReturn } from "react-hook-form";
import React from "react";

interface Props {
  control: UseFormReturn<any>["control"];
  formKey: string;
  placeholder?: string;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad";
}

export const FormInput: React.FC<Props> = ({
  control,
  formKey,
  keyboardType,
  placeholder,
}) => {
  return (
    <>
      <Controller
        control={control}
        name={formKey}
        rules={{ required: `${formKey} is required` }}
        render={({
          field: { onChange, value, name },
          formState: { errors },
        }) => (
          <>
            <TextInput
              keyboardType={keyboardType}
              style={styles.inputContainer}
              label={placeholder ?? formKey}
              mode="outlined"
              value={value}
              onChangeText={onChange}
              error={!!errors[name]} // Error aquí por el nombre del campo
            />
            {errors[name] && (
              <Text style={styles.errorText}>
                {errors[name]?.message ? String(errors[name]?.message) : ""}
              </Text>
            )}
          </>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    height: 50,
  },
  errorText: {
    color: "red",
    fontSize: 15,
    marginBottom: 10,
  },
});
