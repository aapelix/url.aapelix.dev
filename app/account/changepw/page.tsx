import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword } from "./actions";


export default function ChangePasswordPage() {
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <Label htmlFor="new-password">
                            New Password
                        </Label>

                        <Input id="new-password" type="password" name="new-password" />

                        <Button formAction={changePassword}>Change Password</Button>
                    </form>
                </CardContent>

            </Card>
        </div>
    )
}