import { Checkbox } from '@/common/components/ui/checkbox';
import { MultiSelect } from '@/common/components/ui/multi-select';
import { FormError, FormSuccess } from '@/common/components/custom';
import { Form, FormControl, FormField, FormItem } from '@/common/components/ui/form';

import NextImage from 'next/image';
import { Controller } from 'react-hook-form';
import { BlogFormProps } from '@/common/types/blog';
import { Input } from '@/common/components/ui/input';
import { Button } from '@/common/components/ui/button';
import { TextEditor } from '@/common/components/custom/editor';

const blogCategories = [
  { label: 'Technology', value: 'Technology' },
  { label: 'Lifestyle', value: 'Lifestyle' },
  { label: 'Education', value: 'Education' },
  { label: 'Health', value: 'Health' },
  { label: 'Business', value: 'Business' },
];

export const BlogForm = ({
  form,
  onSubmit,
  handleResetBlog,
  handleCoverImageChange,
  coverImagePreview,
  handleContainerClick,
  fileInputRef,
  isPending,
  error,
  success,
  editor,
}: BlogFormProps) => {
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-screen w-full flex-col items-center gap-3 overflow-hidden"
        >
          <div className="flex w-full gap-8">
            <div className="flex w-1/4 flex-col gap-4">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="rounded-md border-gray-300">
                      <Input {...field} type="text" disabled={isPending} placeholder="Blog Title" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="slug"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="rounded-md border-gray-300">
                      <Input {...field} type="text" disabled={isPending} placeholder="Slug" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="categories"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="rounded-md border-gray-300">
                      <MultiSelect
                        {...field}
                        maxCount={3}
                        maxSelections={3}
                        variant="inverted"
                        enableSelectAll={false}
                        options={blogCategories}
                        placeholder="Select Categories"
                        onValueChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Cover Image Section */}
              <div
                onClick={handleContainerClick}
                className="relative flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400"
              >
                <Controller
                  name="coverImage"
                  control={form.control}
                  render={() => (
                    <>
                      <Input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e) => {
                          handleCoverImageChange(e);
                        }}
                      />
                      {coverImagePreview ? (
                        <NextImage
                          width={160}
                          height={160}
                          alt="Cover Preview"
                          src={coverImagePreview}
                          className="absolute inset-0 h-full w-full rounded-lg object-cover"
                        />
                      ) : (
                        <span className="text-gray-500">Click to upload cover image</span>
                      )}
                    </>
                  )}
                />
              </div>

              {/* <FormField
              control={form.control}
              name="isPaid"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3 rounded-lg px-4 py-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="mt-0 text-sm font-medium text-gray-600">Is Paid</FormLabel>
                </FormItem>
              )}
            /> */}

              {/* Reset and Submit Buttons */}
              <div className="mt-4 flex w-full flex-col gap-2">
                <FormError message={error} />
                <FormSuccess message={success} />

                <Button
                  onClick={handleResetBlog}
                  className="w-full rounded-md bg-red-200 p-2 font-semibold text-black hover:bg-red-100"
                >
                  Reset
                </Button>
                <Button type="submit" className="w-full rounded-md p-2 font-semibold text-white">
                  Create Blog
                </Button>
              </div>
            </div>

            {/* Text Editor */}
            <div className="w-3/4">
              <TextEditor editor={editor} />
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
