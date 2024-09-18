import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { gradient } from "@/assets";

const formSchema = z.object({
  nin: z.string().min(11).max(20),
  bvn: z.string().min(11).max(20),
  passportNum: z.string().min(5).max(20),
});

const CreatePublicKey = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nin: "",
      bvn: "",
      passportNum: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="overflow-hidden min-h-screen relative">
      <div className="w-full h-screen flex items-center justify-center gap-x-5 relative">
        <div className="flex flex-col gap-y-2 pt-0 pr-[112px] pl-0 pb-[16px] w-[540px] h-[364px]">
          <h1 className="text-[50px] text-[#oa2540] w-[412px] min-h-[136px]">
            Help us route your inquiry
          </h1>
          <p className="text-[18px] text-[#425466]">
            Setting up your own integration is the fastest and most efficient
            way to start using Stripe. However, if your business processes a
            high volume of payments and has advanced integration needs, our
            sales team would be happy to guide you. Tell us about your business
            and we’ll get you to the right place.
          </p>
        </div>
        <div className="w-[540px] min-h-[338px] shadow-md py-[32px] px-[16px]">
          <p className="text-[26px] text-[#oa2540]">
            Let's make your activities seamless
          </p>
          <p className="text-[18px] text-[#425466]">
            We just need a few quick details.
          </p>
          <div className="py-[32px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 "
              >
                <FormField
                  control={form.control}
                  name="nin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        National Identification Number (NIN)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="454**"
                          {...field}
                          className="text-[16px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bvn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Verification Number (BVN)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="22****"
                          {...field}
                          className="text-[16px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passportNum"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passport Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="A15**"
                          {...field}
                          className="text-[16px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center items-center">
                  <Button type="submit" className="w-[400px] rounded-xl">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <div className="relative z-0">
        <img
          src={gradient}
          alt="gradient"
          className="h-[300px] w-screen transform " // The image stays behind the other elements
        />
      </div>
    </div>
  );
};

export default CreatePublicKey;
