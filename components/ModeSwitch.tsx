"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function ModeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Switch
        onCheckedChange={() =>
          theme === "dark" ? setTheme("light") : setTheme("dark")
        }
        id="dark-mode"
      />
      <Label htmlFor="dark-mode">Dark Mode</Label>
    </div>
  );
}
