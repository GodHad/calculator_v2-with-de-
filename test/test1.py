import os
import shutil

def simplify_directory_structure(source_dir, target_dir):
    """
    Simplify the directory structure by moving specified files from subdirectories to a target directory.

    :param source_dir: Source directory containing the subdirectories.
    :param target_dir: Target directory where the files will be moved.
    """

    # Create target directory if it does not exist
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)

    # Define the files to be moved
    files_to_move = ['index.html', 'calculator.js', 'chart.js']

    for filename in os.listdir(source_dir):
        calculator = os.path.splitext(filename)[0]
        print(calculator) 
        # new_calc_directory = os.path.join(target_dir, calculator)
        # # Create calculator directory if it does not exist
        # if not os.path.exists(new_calc_directory):
        #     os.makedirs(new_calc_directory)

        # index_file = os.path.join(source_dir, calculator, 'index.html')
        # dest_index_file = os.path.join(target_dir, calculator, 'index.html')
        # shutil.copy(index_file, dest_index_file)
        
        # chart_file = os.path.join(source_dir, calculator, 'assets\\js\\chart.js')
        # dest_chart_file = os.path.join(target_dir, calculator, 'chart.js')
        # shutil.copy(chart_file, dest_chart_file)

        # calculator_file = os.path.join(source_dir, calculator, 'assets\\js\\calculator.js')
        # dest_calculator_file = os.path.join(target_dir, calculator, 'calculator.js')
        # shutil.copy(calculator_file, dest_calculator_file)
        
        # helper_file = os.path.join(source_dir, calculator, 'assets\\js\\helpers.js')
        # dest_helper_file = os.path.join(target_dir, calculator, 'helpers.js')
        # if os.path.exists(helper_file):
        #     shutil.copy(helper_file, dest_helper_file)


# Usage
source_directory = 'calc'  # Source directory containing the parent directories
target_directory = 'newcalc'  # Target directory where the files will be moved

# Call the function
simplify_directory_structure(source_directory, target_directory)
